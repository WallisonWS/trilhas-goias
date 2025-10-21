import express from 'express';
import { uploadPhoto, uploadPhotos, uploadGPX as uploadGPXController, deleteFile } from '../controllers/uploadController.js';
import { uploadSingle, uploadMultiple, uploadGPX } from '../middleware/upload.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All upload routes require authentication
router.use(protect);

// Photo uploads
router.post('/photo', uploadSingle, uploadPhoto);
router.post('/photos', uploadMultiple, uploadPhotos);

// GPX upload
router.post('/gpx', uploadGPX, uploadGPXController);

// Delete file
router.delete('/:filename', deleteFile);

export default router;