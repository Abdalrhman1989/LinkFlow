const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const router = express.Router();

const prisma = new PrismaClient();

// Get all links for the authenticated user
router.get('/', auth, async (req, res) => {
    try {
        const links = await prisma.link.findMany({
            where: { userId: req.user.userId },
            orderBy: { order: 'asc' }
        });
        res.json(links);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new link
router.post('/', auth, async (req, res) => {
    const { label, url, icon, color, type } = req.body;

    try {
        // Get current max order
        const maxOrder = await prisma.link.findFirst({
            where: { userId: req.user.userId },
            orderBy: { order: 'desc' },
            select: { order: true }
        });

        const newOrder = maxOrder ? maxOrder.order + 1 : 0;

        const link = await prisma.link.create({
            data: {
                label,
                url,
                icon,
                color,
                type,
                order: newOrder,
                userId: req.user.userId
            }
        });
        res.status(201).json(link);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update Link Order (Drag & Drop)
router.put('/reorder', auth, async (req, res) => {
    const { links } = req.body;
    if (!Array.isArray(links)) {
        return res.status(400).json({ message: 'Invalid data' });
    }
    try {
        const updatePromises = links.map(link =>
            prisma.link.update({
                where: { id: link.id },
                data: { order: link.order }
            })
        );
        await prisma.$transaction(updatePromises);
        res.json({ message: 'Links reordered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during reorder' });
    }
});

// Update a link
router.put('/:id', auth, async (req, res) => {
    const { label, url, icon, color, order, startDate, endDate } = req.body;
    const { id } = req.params;

    try {
        // Verify ownership
        const link = await prisma.link.findUnique({ where: { id: parseInt(id) } });
        if (!link || link.userId !== req.user.userId) {
            return res.status(404).json({ message: 'Link not found or unauthorized' });
        }

        const updatedLink = await prisma.link.update({
            where: { id: parseInt(id) },
            data: {
                label, url, icon, color, order,
                startDate: startDate ? new Date(startDate) : null,
                endDate: endDate ? new Date(endDate) : null
            }
        });
        res.json(updatedLink);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete a link
router.delete('/:id', auth, async (req, res) => {
    const { id } = req.params;

    try {
        const link = await prisma.link.findUnique({ where: { id: parseInt(id) } });
        if (!link || link.userId !== req.user.userId) {
            return res.status(404).json({ message: 'Link not found or unauthorized' });
        }

        await prisma.link.delete({ where: { id: parseInt(id) } });
        res.json({ message: 'Link deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Increment Click Count (Public)
router.post('/:id/click', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.link.update({
            where: { id: parseInt(id) },
            data: { clicks: { increment: 1 } }
        });
        res.json({ message: 'Click counted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
