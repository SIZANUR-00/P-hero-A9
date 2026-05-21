import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const FacilityDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [facility, setFacility] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({
    bookingDate: '',
    timeSlot: '',
    hours: 1,
    totalPrice: 0
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchFacility();
  }, [id]);

  useEffect(() => {
    if (facility) {
      setBooking(prev => ({
        ...prev,
        totalPrice: facility.pricePerHour * prev.hours
      }));
    }
  }, [booking.hours, facility]);

  const fetchFacility = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/facilities/${id}`);
      setFacility(data);
    } catch (error) {
      toast.error('Failed to load facility');
      navigate('/facilities');
    } finally {
      setLoading(false);
    }
  };

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error('Please login to book');
      navigate('/login');
      return;
    }
    
    setSubmitting(true);
    
    try {
      await axios.post(`${API_URL}/bookings`, {
        facilityId: id,
        bookingDate: booking.bookingDate,
        timeSlot: booking.timeSlot,
        hours: booking.hours,
        totalPrice: booking.totalPrice
      });
      
      toast.success('Booking created successfully!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!facility) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Facility Image and Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={facility.imageURL}
            alt={facility.name}
            className="w-full h-96 object-cover rounded-xl shadow-lg"
          />
          
          <div className="mt-6">
            <h1 className="text-3xl font-bold mb-4">{facility.name}</h1>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Type</p>
                <p className="font-semibold">{facility.facilityType}</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Price</p>
                <p className="font-semibold text-blue-500">${facility.pricePerHour}/hour</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Capacity</p>
                <p className="font-semibold">{facility.capacity} people</p>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                <p className="font-semibold">{facility.location}</p>
              </div>
            </div>
            
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-gray-600 dark:text-gray-400">{facility.description}</p>
          </div>
        </motion.div>

        {/* Booking Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold mb-6">Book This Facility</h2>
          
          <form onSubmit={handleSubmitBooking} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Booking Date</label>
              <input
                type="date"
                name="bookingDate"
                required
                value={booking.bookingDate}
                onChange={handleBookingChange}
                min={new Date().toISOString().split('T')[0]}
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Time Slot</label>
              <select
                name="timeSlot"
                required
                value={booking.timeSlot}
                onChange={handleBookingChange}
                className="input-field"
              >
                <option value="">Select time slot</option>
                <option value="06:00-08:00">06:00 - 08:00</option>
                <option value="08:00-10:00">08:00 - 10:00</option>
                <option value="10:00-12:00">10:00 - 12:00</option>
                <option value="12:00-14:00">12:00 - 14:00</option>
                <option value="14:00-16:00">14:00 - 16:00</option>
                <option value="16:00-18:00">16:00 - 18:00</option>
                <option value="18:00-20:00">18:00 - 20:00</option>
                <option value="20:00-22:00">20:00 - 22:00</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Hours</label>
              <input
                type="number"
                name="hours"
                required
                min="1"
                max="4"
                value={booking.hours}
                onChange={handleBookingChange}
                className="input-field"
              />
            </div>
            
            <div className="bg-blue-500/10 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Price:</span>
                <span className="text-2xl font-bold text-blue-500">
                  ${booking.totalPrice}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                * Price includes all taxes and fees
              </p>
            </div>
            
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50"
            >
              {submitting ? 'Processing...' : 'Confirm Booking'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FacilityDetails;