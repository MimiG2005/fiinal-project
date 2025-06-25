import express from 'express';
import serviceTypeController from '../controllers/service_type.js';
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

// GET /api/service-types - שליפת כל סוגי השירותים (למנהל בלבד)
router.get('/',serviceTypeController.getAllServiceTypes);
// router.get('/', authorizeRole('admin'), serviceTypeController.getAllServiceTypes);

// GET /api/service-types/:id - שליפת סוג שירות לפי מזהה
router.get('/:id', serviceTypeController.getServiceTypeById);

// POST /api/service-types - יצירת סוג שירות חדש (למנהל בלבד)
router.post('/', authorizeRole('admin'), serviceTypeController.createServiceType);

// PUT /api/service-types/:id - עדכון סוג שירות קיים (למנהל בלבד)
router.put('/:id', authorizeRole('admin'), serviceTypeController.updateServiceType);

// DELETE /api/service-types/:id - מחיקת סוג שירות (למנהל בלבד)
router.delete('/:id', authorizeRole('admin'), serviceTypeController.deleteServiceType);

export default router;
