import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Allowed MIME types
const allowedTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png'
];

// Define Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    // Optional: validate mimetype before uploading to Cloudinary
    if (!allowedTypes.includes(file.mimetype)) {
      throw new Error('Only PDF, DOC, DOCX, JPG, and PNG files are allowed');
    }

    return {
      folder: 'fileanywhere',
      resource_type: 'raw',
      type: 'upload', 
      public_id: Date.now() + '-' + file.originalname.replace(/\s/g, '_'),
    };
  },
});

// Setup multer with Cloudinary storage
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
});


export const validation = (req, res, next) => {
    upload.single("file")(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        return res.status(400).json({ error: err.message }); // Multer-specific error
      } else if (err) {
        return res.status(400).json({ error: err.message }); // Any other error
      }
      next();
    });
  }

export default upload;
