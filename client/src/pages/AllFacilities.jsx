import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const AddFacility = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    facilityType: '',
    imageURL: '',
    location: '',
    pricePerHour: '',
    capacity: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await axios.post(`${API_URL}/facilities`, {
        ...formData,
        pricePerHour: Number(formData.pricePerHour),
        capacity: Number(formData.capacity),
        ownerEmail: user.email
      });
      
      toast.success('Facility added successfully!');
      navigate('/manage-facilities');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add facility');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">Add New Facility</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Facility Name *</label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Premier Football Turf"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Facility Type *</label>
              <select
                name="facilityType"
                required
                value={formData.facilityType}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select type</option>
                <option value="Football Turf">Football Turf</option>
                <option value="Badminton Court">Badminton Court</option>
                <option value="Swimming Lane">Swimming Lane</option>
                <option value="Tennis Court">Tennis Court</option>
                <option value="Basketball Court">Basketball Court</option>
                <option value="Cricket Pitch">Cricket Pitch</option>
              </select>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Image URL *</label>
            <input
              type="url"
              name="imageURL"
              required
              value={formData.imageURL}
              onChange={handleChange}
              className="input-field"
              placeholder="https://example.com/image.jpg"
            />
            {formData.imageURL && (
              <img src={formData.imageURL} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-lg" />
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="input-field"
              placeholder="Full address"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price Per Hour ($) *</label>
              <input
                type="number"
                name="pricePerHour"
                required
                min="0"
                step="1"
                value={formData.pricePerHour}
                onChange={handleChange}
                className="input-field"
                placeholder="50"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Capacity (People) *</label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                className="input-field"
                placeholder="10"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <textarea
              name="description"
              required
              rows="5"
              value={formData.description}
              onChange={handleChange}
              className="input-field"
              placeholder="Detailed description of the facility..."
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex-1 py-3 disabled:opacity-50"
            >
              {submitting ? 'Adding Facility...' : 'Add Facility'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/manage-facilities')}
              className="btn-outline px-6 py-3"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AddFacility;