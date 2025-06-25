import express from 'express';
import orderController from '../controllers/orders.js';
import { authorizeRole } from '../middleware/verifyToken.js';

const router = express.Router();

// שליפת כל ההזמנות (למנהל בלבד)
// router.get('/', authorizeRole('admin'), orderController.getAllOrders);
router.get('/',  orderController.getAllOrders);

// שליפת הזמנות לפי מזהה לקוח
router.get('/client/:clientId', authorizeRole('client'), orderController.getOrdersByClientId);

// שליפת הזמנות לפי מזהה אירוע
router.get('/event/:eventId', authorizeRole('client'), orderController.getOrdersByEventId);

// שליפת הזמנה בודדת לפי מזהה
router.get('/:id', orderController.getOrderById);

// שליפת הזמנות ממתינות של ספק מסוים
router.get('/provider/:providerId/pending', authorizeRole('provider'), orderController.getPendingOrdersForProvider);

// יצירת הזמנה חדשה (לקוח)
router.post('/', authorizeRole('client'), orderController.createOrder);

// עדכון הזמנה קיימת (רשות – ללקוח או לספק, לפי צורך)
router.put('/:id', authorizeRole(['client','admin']), orderController.updateOrder);

// מחיקת הזמנה (רשות – אם מותר)
router.delete('/:id', authorizeRole('client'), orderController.deleteOrder);

router.put('/:orderId/status', authorizeRole('provider') ,orderController.updateOrderStatus);

router.get('/provider/:providerId/approved', authorizeRole('provider'), orderController.getApprovedOrdersForProvider);

router.get('/provider/:providerId/history', authorizeRole('provider'), orderController.getOrderHistoryForProvider);

router.get('/event/:eventId/full', authorizeRole('client'), orderController.getFullOrdersByEventId);

export default router;
