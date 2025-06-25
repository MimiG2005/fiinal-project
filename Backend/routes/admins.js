// routes/admins.js
import express from 'express';
import adminController from '../controllers/admins.js';
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

// פעולות על המנהלים
router.get('/', authorizeRole('admin'), adminController.getAllAdmins);
router.post('/', adminController.createAdmin);
router.get('/:id', authorizeRole('admin'), adminController.getAdminById);
router.put('/:id', authorizeRole('admin'), adminController.updateAdmin);
router.delete('/:id', authorizeRole('admin'), adminController.deleteAdmin);

export default router;
