import express from 'express';
import eventController from '../controllers/events.js';
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

router.get('/event-types', eventController.getEventTypes);
router.get('/client/:id', authorizeRole('client'), eventController.getEventsByClientId);
router.get('/', eventController.getAllEvents);
router.post('/', eventController.createEvent);
router.put('/:id', authorizeRole('client'), eventController.updateEvent);
router.delete('/:id', authorizeRole('client'), eventController.deleteEvent);
router.get('/with-clients/:id', eventController.getEventWithClientNames);

// זה האחרון – בסוף!
router.get('/:id', eventController.getEventById);


export default router;
