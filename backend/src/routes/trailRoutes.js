import express from 'express';
import {
  getTrails,
  getTrail,
  getNearbyTrails,
  createTrail,
  updateTrail,
  deleteTrail,
  getTrailStats
} from '../controllers/trailController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTrails);
router.get('/nearby', getNearbyTrails);
router.get('/:id', getTrail);
router.get('/:id/stats', getTrailStats);

// Protected routes (admin only - to be implemented)
router.post('/', protect, createTrail);
router.put('/:id', protect, updateTrail);
router.delete('/:id', protect, deleteTrail);

export default router;