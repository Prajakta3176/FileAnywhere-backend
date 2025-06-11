import multer from 'multer';
import path from 'path';

// Set storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // local folder
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_');
        cb(null, uniqueName);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'image/png', 'image/jpeg', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Only PDF, DOC, and image files are allowed'), false);
    }
};

// Limit file size to 10MB
const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 10 * 1024 * 1024 }
});

export default upload;
