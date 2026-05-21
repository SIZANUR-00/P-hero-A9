import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { FaCalendar, FaClock, FaDollarSign, FaTimesCircle } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/bookings/my-bookings`);
      setBookings(data);
    } catch (error) {
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await axios.patch(`${API_URL}/bookings/${bookingId}/cancel`);
        toast.success('Booking cancelled successfully');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to cancel booking');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">My Bookings</h1>
        <p className="text-gray-600 dark:text-gray-400">
          View and manage all your facility bookings
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No bookings found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{booking.facilityName}</h3>
                    <div className="space-y-1">
                      <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaCalendar /> Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaClock /> Time Slot: {booking.timeSlot}
                      </p>
                      <p className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <FaDollarSign /> Total Price: ${booking.totalPrice}
                      </p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                    
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="mt-3 flex items-center gap-2 text-red-600 hover:text-red-700 transition"
                      >
                        <FaTimesCircle /> Cancel Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;