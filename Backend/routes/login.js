import express from 'express';
import { login, relogin } from '../controllers/login.js';
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

router.post('/', login); // POST /api/login
router.post('/relogin',authorizeRole('') ,relogin); // POST /api/login

export default router;
