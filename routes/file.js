import express from 'express';
import { getAllFiles, uploadFile } from '../controllers/file.js';
import authenticateToken from '../middlewares/userAuth.js';
 const fileRouter = express.Router();
 import upload, { validation } from '../middlewares/fileUpload.js';

fileRouter
.post("/upload-file", authenticateToken,validation,uploadFile)
.get("/get-all-files",authenticateToken,getAllFiles)



 export default fileRouter;
