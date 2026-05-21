import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AllFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('all');
  const [sort, setSort] = useState('');

  const facilityTypes = ['all', 'Football Turf', 'Badminton Court', 'Swimming Lane', 'Tennis Court', 'Basketball Court', 'Cricket Pitch'];

  useEffect(() => {
    fetchFacilities();
  }, [search, type, sort]);

  const fetchFacilities = async () => {
    setLoading(true);
    try {
      let url = `${API_URL}/facilities?`;
      if (search) url += `search=${search}&`;
      if (type && type !== 'all') url += `type=${type}&`;
      if (sort) url += `sort=${sort}&`;
      
      const { data } = await axios.get(url);
      setFacilities(data);
    } catch (error) {
      console.error('Error fetching facilities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">All Facilities</h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Find and book the perfect sports facility for your needs
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Search</label>
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by facility name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Facility Type</label>
            <div className="relative">
              <FaFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="input-field pl-10 appearance-none"
              >
                {facilityTypes.map(t => (
                  <option key={t} value={t}>{t === 'all' ? 'All Types' : t}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sort By</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="input-field"
            >
              <option value="">Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      {loading ? (
        <LoadingSpinner />
      ) : facilities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No facilities found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="card"
            >
              <img
                src={facility.imageURL}
                alt={facility.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{facility.name}</h3>
                  <span className="text-blue-500 font-bold">${facility.pricePerHour}/hr</span>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Type: {facility.facilityType}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                  Location: {facility.location}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  Capacity: {facility.capacity} people
                </p>
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
  );
};

export default AllFacilities;