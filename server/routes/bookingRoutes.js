import express from 'express';
import {
  createBooking,
  getUserBookings,
  cancelBooking,
  updateBookingStatus
} from '../controllers/bookingController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/my-bookings', verifyToken, getUserBookings);
router.post('/', verifyToken, createBooking);
router.patch('/:id/cancel', verifyToken, cancelBooking);
router.patch('/:id/status', verifyToken, updateBookingStatus);

export default router;