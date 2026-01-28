const express = require('express');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const linkRoutes = require('./routes/links');
const uploadRoutes = require('./routes/upload');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(require('cors')());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/links', linkRoutes);
app.use('/api/upload', uploadRoutes);

// Smart NFC Redirect Endpoint
app.get('/:username/nfc', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.params.username },
            include: {
                links: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if Direct Mode is ON and there is at least one link
        if (user.directMode && user.links.length > 0) {
            // Find first active link (considering scheduling)
            const now = new Date();
            const firstActiveLink = user.links.find(link => {
                const start = link.startDate ? new Date(link.startDate) : null;
                const end = link.endDate ? new Date(link.endDate) : null;
                if (start && now < start) return false;
                if (end && now > end) return false;
                return true;
            });

            if (firstActiveLink) {
                // Register click
                await prisma.link.update({
                    where: { id: firstActiveLink.id },
                    data: { clicks: { increment: 1 } }
                });
                return res.redirect(firstActiveLink.url);
            }
        }

        // If not Direct Mode, or no links, redirect to the Public Profile
        res.redirect(`http://localhost:5173/${user.username}`);

    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Public Profile Endpoint with Theme/Accent/SEO/DirectMode support
app.get('/api/users/:username', async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { username: req.params.username },
            include: {
                links: {
                    orderBy: { order: 'asc' }
                }
            }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Filter Scheduled Links
        const now = new Date();
        const activeLinks = user.links.filter(link => {
            const start = link.startDate ? new Date(link.startDate) : null;
            const end = link.endDate ? new Date(link.endDate) : null;

            if (start && now < start) return false;
            if (end && now > end) return false;

            return true;
        });

        const userWithActiveLinks = { ...user, links: activeLinks };

        const { password, ...userWithoutPassword } = userWithActiveLinks;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
