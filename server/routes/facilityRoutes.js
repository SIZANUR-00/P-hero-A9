import express from 'express';
import {
  createFacility,
  getAllFacilities,
  getFacilityById,
  updateFacility,
  deleteFacility,
  getMyFacilities
} from '../controllers/facilityController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllFacilities);
router.get('/my-facilities', verifyToken, getMyFacilities);
router.get('/:id', getFacilityById);
router.post('/', verifyToken, createFacility);
router.put('/:id', verifyToken, updateFacility);
router.delete('/:id', verifyToken, deleteFacility);

export default router;