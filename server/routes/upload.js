const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const router = express.Router();

// Configure storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        if (mimetype && extname) {
            return cb(null, true);
        }
        cb(new Error("Error: File upload only supports images!"));
    }
});

router.post('/', auth, upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    // Return the public URL
    // Assuming the server serves 'uploads' at /uploads
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
});

module.exports = router;
