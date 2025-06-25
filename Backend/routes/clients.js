import express from 'express';
import clientController from '../controllers/clients.js'; // ודא/י שהנתיב לקובץ ה-controller נכון
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/', clientController.getAllClients); // GET /api/clients - קבלת כל הלקוחות
router.get('/:id', clientController.getClientById); // GET /api/clients/:id - קבלת לקוח ספציפי
router.post('/', clientController.createClient); // POST /api/clients - יצירת לקוח חדש
router.put('/:id', clientController.updateClient); // PUT /api/clients/:id - עדכון לקוח קיים
router.delete('/:id', clientController.deleteClient); // DELETE /api/clients/:id - מחיקת לקוח

export default router;