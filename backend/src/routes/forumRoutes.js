import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  toggleLike,
  getUserPosts
} from '../controllers/forumController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/user', protect, getUserPosts);
router.get('/:id', getPost);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.post('/:id/comment', protect, addComment);
router.post('/:id/like', protect, toggleLike);

export default router;