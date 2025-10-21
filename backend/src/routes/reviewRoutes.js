import express from 'express';
import {
  getTrailReviews,
  getUserReviews,
  createReview,
  updateReview,
  deleteReview,
  toggleLike
} from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/trail/:trailId', getTrailReviews);
router.get('/user', protect, getUserReviews);
router.post('/', protect, createReview);
router.put('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);
router.post('/:id/like', protect, toggleLike);

export default router;