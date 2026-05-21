import Booking from '../models/Booking.js';
import Facility from '../models/Facility.js';

export const createBooking = async (req, res) => {
  try {
    const { facilityId, bookingDate, timeSlot, hours, totalPrice } = req.body;
    
    const facility = await Facility.findById(facilityId);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    const booking = new Booking({
      facilityId,
      facilityName: facility.name,
      userEmail: req.user.email,
      userName: req.user.name,
      bookingDate,
      timeSlot,
      hours,
      totalPrice,
      status: 'pending'
    });
    
    await booking.save();
    
    // Increment booking count
    facility.bookingCount += 1;
    await facility.save();
    
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.user.email })
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    if (booking.userEmail !== req.user.email) {
      return res.status(403).json({ message: 'You can only cancel your own bookings' });
    }
    
    if (booking.status === 'cancelled') {
      return res.status(400).json({ message: 'Booking already cancelled' });
    }
    
    booking.status = 'cancelled';
    await booking.save();
    
    res.json({ message: 'Booking cancelled successfully', booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);
    
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    
    booking.status = status;
    await booking.save();
    
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};