const express = require('express');
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');
const router = express.Router();

const prisma = new PrismaClient();

// Get Current User (Me)
router.get('/me', auth, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                bio: true,
                avatarUrl: true,
                verified: true,
                theme: true,
                accentColor: true,
                pageTitle: true,
                metaDescription: true,
                directMode: true // Include directMode
            }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Update User Profile
router.put('/me', auth, async (req, res) => {
    const { fullName, bio, avatarUrl, theme, accentColor, pageTitle, metaDescription, directMode } = req.body;
    try {
        const user = await prisma.user.update({
            where: { id: req.user.userId },
            data: { fullName, bio, avatarUrl, theme, accentColor, pageTitle, metaDescription, directMode },
            select: {
                id: true,
                username: true,
                email: true,
                fullName: true,
                bio: true,
                avatarUrl: true,
                verified: true,
                theme: true,
                accentColor: true,
                pageTitle: true,
                metaDescription: true,
                directMode: true
            }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Register
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
    const { username, email, password, fullName } = req.body;

    try {
        // Check if user exists
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                fullName
            }
        });

        // Generate Token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.status(201).json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                theme: user.theme,
                accentColor: user.accentColor
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '7d'
        });

        res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                theme: user.theme,
                accentColor: user.accentColor,
                pageTitle: user.pageTitle,
                metaDescription: user.metaDescription,
                directMode: user.directMode
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

module.exports = router;
