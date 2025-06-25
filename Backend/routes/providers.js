import express from 'express';
import providerController from '../controllers/providers.js';
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

// GET /api/providers - שליפת כל הספקים (מוגבל למנהל)
router.get('/', authorizeRole('admin'), providerController.getAllProviders);

// GET /api/providers/:id - שליפת ספק לפי ID (פתוח לכל תפקיד)
router.get('/:id', providerController.getProviderById);

// POST /api/providers - יצירת ספק חדש (פתוח להרשמה עצמית או רק למנהל - תלוי בדרישה)
router.post('/', providerController.createProvider);

// PUT /api/providers/:id - עדכון ספק (מאובטח לספק עצמו בלבד)
router.put('/:id', authorizeRole('provider'), providerController.updateProvider);

// DELETE /api/providers/:id - מחיקת ספק (מוגבל למנהל בלבד)
router.delete('/:id', authorizeRole('admin'), providerController.deleteProvider);

router.get('/by-service-type/:id', authorizeRole('client'), providerController.getProvidersByServiceType);

export default router;
