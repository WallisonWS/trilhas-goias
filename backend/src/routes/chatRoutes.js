import express from 'express';
import {
  getRoomMessages,
  sendMessage,
  editMessage,
  deleteMessage,
  markAsRead,
  getActiveRooms
} from '../controllers/chatController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All chat routes require authentication
router.use(protect);

router.get('/rooms', getActiveRooms);
router.get('/:roomId', getRoomMessages);
router.post('/:roomId', sendMessage);
router.put('/message/:messageId', editMessage);
router.delete('/message/:messageId', deleteMessage);
router.post('/message/:messageId/read', markAsRead);

export default router;