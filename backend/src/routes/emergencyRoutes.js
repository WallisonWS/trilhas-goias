import express from 'express';
import {
  createSOS,
  getUserEmergencies,
  getEmergency,
  resolveEmergency,
  cancelEmergency,
  getActiveEmergencies
} from '../controllers/emergencyController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/sos', protect, createSOS);
router.get('/user', protect, getUserEmergencies);
router.get('/active', protect, getActiveEmergencies);
router.get('/:id', protect, getEmergency);
router.put('/:id/resolve', protect, resolveEmergency);
router.put('/:id/cancel', protect, cancelEmergency);

export default router;