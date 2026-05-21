import Facility from '../models/Facility.js';

export const createFacility = async (req, res) => {
  try {
    const facilityData = {
      ...req.body,
      ownerEmail: req.user.email
    };
    
    const facility = new Facility(facilityData);
    await facility.save();
    
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllFacilities = async (req, res) => {
  try {
    const { search, type, sort } = req.query;
    let query = {};
    
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    
    if (type && type !== 'all') {
      query.facilityType = type;
    }
    
    let facilitiesQuery = Facility.find(query);
    
    if (sort === 'price-asc') {
      facilitiesQuery = facilitiesQuery.sort({ pricePerHour: 1 });
    } else if (sort === 'price-desc') {
      facilitiesQuery = facilitiesQuery.sort({ pricePerHour: -1 });
    } else if (sort === 'popular') {
      facilitiesQuery = facilitiesQuery.sort({ bookingCount: -1 });
    }
    
    const facilities = await facilitiesQuery;
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    if (facility.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: 'You can only update your own facilities' });
    }
    
    const updatedFacility = await Facility.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    res.json(updatedFacility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    if (facility.ownerEmail !== req.user.email) {
      return res.status(403).json({ message: 'You can only delete your own facilities' });
    }
    
    await Facility.findByIdAndDelete(req.params.id);
    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find({ ownerEmail: req.user.email });
    res.json(facilities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};