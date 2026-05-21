import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ManageMyFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    fetchMyFacilities();
  }, []);

  const fetchMyFacilities = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/facilities/my-facilities`);
      setFacilities(data);
    } catch (error) {
      toast.error('Failed to load facilities');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this facility? This action cannot be undone.')) {
      try {
        await axios.delete(`${API_URL}/facilities/${id}`);
        toast.success('Facility deleted successfully');
        fetchMyFacilities();
      } catch (error) {
        toast.error('Failed to delete facility');
      }
    }
  };

  const handleEdit = (facility) => {
    setEditingId(facility._id);
    setEditForm(facility);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`${API_URL}/facilities/${id}`, editForm);
      toast.success('Facility updated successfully');
      setEditingId(null);
      fetchMyFacilities();
    } catch (error) {
      toast.error('Failed to update facility');
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Manage My Facilities</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update or delete your listed facilities
          </p>
        </div>
        <Link to="/add-facility" className="btn-primary flex items-center gap-2">
          <FaPlus /> Add New Facility
        </Link>
      </div>

      {facilities.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg mb-4">You haven't added any facilities yet</p>
          <Link to="/add-facility" className="btn-primary inline-block">
            Add Your First Facility
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {facilities.map((facility, index) => (
            <motion.div
              key={facility._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {editingId === facility._id ? (
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">Edit Facility</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="name"
                      value={editForm.name}
                      onChange={handleEditChange}
                      className="input-field"
                      placeholder="Facility Name"
                    />
                    <select
                      name="facilityType"
                      value={editForm.facilityType}
                      onChange={handleEditChange}
                      className="input-field"
                    >
                      <option value="Football Turf">Football Turf</option>
                      <option value="Badminton Court">Badminton Court</option>
                      <option value="Swimming Lane">Swimming Lane</option>
                      <option value="Tennis Court">Tennis Court</option>
                    </select>
                    <input
                      type="text"
                      name="location"
                      value={editForm.location}
                      onChange={handleEditChange}
                      className="input-field"
                      placeholder="Location"
                    />
                    <input
                      type="number"
                      name="pricePerHour"
                      value={editForm.pricePerHour}
                      onChange={handleEditChange}
                      className="input-field"
                      placeholder="Price Per Hour"
                    />
                    <input
                      type="number"
                      name="capacity"
                      value={editForm.capacity}
                      onChange={handleEditChange}
                      className="input-field"
                      placeholder="Capacity"
                    />
                    <textarea
                      name="description"
                      value={editForm.description}
                      onChange={handleEditChange}
                      className="input-field col-span-2"
                      rows="3"
                      placeholder="Description"
                    />
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button
                      onClick={() => handleUpdate(facility._id)}
                      className="btn-primary"
                    >
                      Save Changes
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="btn-outline"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col md:flex-row">
                  <img
                    src={facility.imageURL}
                    alt={facility.name}
                    className="w-full md:w-48 h-48 object-cover"
                  />
                  <div className="flex-1 p-6">
                    <div className="flex flex-wrap justify-between items-start gap-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{facility.name}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          Type: {facility.facilityType}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">
                          Location: {facility.location}
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          Price: ${facility.pricePerHour}/hour | Capacity: {facility.capacity} people
                        </p>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">
                          Bookings: {facility.bookingCount || 0}
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleEdit(facility)}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          onClick={() => handleDelete(facility._id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                        >
                          <FaTrash /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageMyFacilities;