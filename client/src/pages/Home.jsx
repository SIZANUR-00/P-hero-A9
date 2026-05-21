import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { FaCalendarCheck, FaUsers, FaTrophy, FaClock } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [featuredFacilities, setFeaturedFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedFacilities();
  }, []);

  const fetchFeaturedFacilities = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/facilities`);
      setFeaturedFacilities(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Book Your Dream Sports Facility
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Find and book football turfs, badminton courts, swimming pools and more
            </p>
            <Link to="/facilities" className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition text-lg inline-block">
              Explore Facilities
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <FaCalendarCheck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-600 dark:text-gray-400">Bookings Made</p>
            </div>
            <div className="text-center">
              <FaUsers className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold">1000+</h3>
              <p className="text-gray-600 dark:text-gray-400">Happy Users</p>
            </div>
            <div className="text-center">
              <FaTrophy className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold">50+</h3>
              <p className="text-gray-600 dark:text-gray-400">Facilities</p>
            </div>
            <div className="text-center">
              <FaClock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
              <h3 className="text-3xl font-bold">24/7</h3>
              <p className="text-gray-600 dark:text-gray-400">Booking Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Facilities Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Facilities</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Discover our most popular sports venues
            </p>
          </motion.div>

          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredFacilities.map((facility, index) => (
                <motion.div
                  key={facility._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card group"
                >
                  <img
                    src={facility.imageURL}
                    alt={facility.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{facility.name}</h3>
                      <span className="text-blue-500 font-bold">${facility.pricePerHour}/hr</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">{facility.location}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {facility.description}
                    </p>
                    <Link
                      to={`/facility/${facility._id}`}
                      className="btn-primary w-full text-center inline-block"
                    >
                      Book Now
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SportNest?</h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              We make sports facility booking simple and convenient
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Booking</h3>
              <p className="text-gray-600 dark:text-gray-400">Book any facility in just a few clicks</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Best Prices</h3>
              <p className="text-gray-600 dark:text-gray-400">Competitive rates for all facilities</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaTrophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600 dark:text-gray-400">Top-rated sports facilities</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;