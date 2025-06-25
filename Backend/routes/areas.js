import express from 'express';
import {
  getAllAreas
} from '../controllers/areas.js';

const router = express.Router();

router.get('/', getAllAreas);          // GET /api/areas
// router.get('/:id', getAreaById);       // GET /api/areas/:id
// router.post('/', createArea);          // POST /api/areas

export default router;
