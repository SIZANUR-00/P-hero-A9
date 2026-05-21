import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  facilityType: {
    type: String,
    required: true,
    enum: ['Football Turf', 'Badminton Court', 'Swimming Lane', 'Tennis Court', 'Basketball Court', 'Cricket Pitch']
  },
  imageURL: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true,
    min: 0
  },
  capacity: {
    type: Number,
    required: true,
    min: 1
  },
  description: {
    type: String,
    required: true
  },
  ownerEmail: {
    type: String,
    required: true
  },
  bookingCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Facility', facilitySchema);