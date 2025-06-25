import {
  QueryListOfOrders,
  QueryOrderById,
  QueryOrdersByClientId,
  QueryOrdersByEventId,
  QueryCreateOrder,
  QueryUpdateOrder,
  QueryDeleteOrder,
  QueryPendingOrdersByProviderId,
  QueryUpdateOrderStatus,
  QueryApprovedOrdersByProviderId,
  QueryOrderHistoryByProviderId,
  QueryFullOrdersByEventId
} from '../services/orders.js';

export const getAllOrders = async (req, res) => {
    console.log('getAllOrders', req.user);
    try {
        const orders = await QueryListOfOrders();
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error in getAllOrders:', err);
        res.status(500).json({ error: 'Failed to retrieve orders', details: err.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await QueryOrderById(req.params.id);
        if (!order || order.length === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order[0]);
    } catch (err) {
        console.error('Error in getOrderById:', err);
        res.status(500).json({ error: 'Failed to retrieve order', details: err.message });
    }
};

export const getOrdersByClientId = async (req, res) => {
    try {
        const orders = await QueryOrdersByClientId(req.params.clientId);
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error in getOrdersByClientId:', err);
        res.status(500).json({ error: 'Failed to retrieve orders for client', details: err.message });
    }
};

export const getOrdersByEventId = async (req, res) => {
    try {
        const orders = await QueryOrdersByEventId(req.params.eventId);
        res.status(200).json(orders);
    } catch (err) {
        console.error('Error in getOrdersByEventId:', err);
        res.status(500).json({ error: 'Failed to retrieve orders for event', details: err.message });
    }
};

export const createOrder = async (req, res) => {
    try {
        const result = await QueryCreateOrder(req.body);
        res.status(201).json({ message: 'Order created successfully', id: result.insertId });
    } catch (err) {
        console.error('Error in createOrder:', err);
        res.status(500).json({ error: 'Failed to create order', details: err.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const result = await QueryUpdateOrder(req.params.id, req.body);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found or no changes made' });
        }
        res.status(200).json({ message: 'Order updated successfully', data: result });
    } catch (err) {
        console.error('Error in updateOrder:', err);
        res.status(500).json({ error: 'Failed to update order', details: err.message });
    }
};

export const deleteOrder = async (req, res) => {
    try {
        const result = await QueryDeleteOrder(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order deleted successfully', data: result });
    } catch (err) {
        console.error('Error in deleteOrder:', err);
        res.status(500).json({ error: 'Failed to delete order', details: err.message });
    }
};
export const getPendingOrdersForProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const statusId = 2; // סטטוס "ממתין"
    const orders = await QueryPendingOrdersByProviderId(providerId, statusId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error in getPendingOrdersForProvider:', err);
    res.status(500).json({ error: 'Failed to retrieve pending orders for provider' });
  }
};
export const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.orderId; // תיקון השורה
    const { status_id } = req.body;

    if (!status_id) {
      return res.status(400).json({ error: 'Missing status_id in request body' });
    }

    const result = await QueryUpdateOrderStatus(orderId, status_id);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Order not found or no changes made' });
    }

    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Error in updateOrderStatus:', err);
    res.status(500).json({ error: 'Failed to update order status', details: err.message });
  }
};


export const getApprovedOrdersForProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const statusId = 1; // סטטוס מאושר
    const orders = await QueryApprovedOrdersByProviderId(providerId, statusId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error in getApprovedOrdersForProvider:', err);
    res.status(500).json({ error: 'Failed to retrieve approved orders for provider' });
  }
};


export const getOrderHistoryForProvider = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const orders = await QueryOrderHistoryByProviderId(providerId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error in getOrderHistoryForProvider:', err);
    res.status(500).json({ error: 'Failed to retrieve order history for provider' });
  }
};
export const getFullOrdersByEventId = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const orders = await QueryFullOrdersByEventId(eventId);
    res.status(200).json(orders);
  } catch (err) {
    console.error('Error in getFullOrdersByEventId:', err);
    res.status(500).json({ error: 'Failed to retrieve full orders for event', details: err.message });
  }
};

export default {
    getAllOrders,
    getOrderById,
    getOrdersByClientId,
    getOrdersByEventId,
    createOrder,
    updateOrder,
    deleteOrder,
    getPendingOrdersForProvider,
    updateOrderStatus,
    getApprovedOrdersForProvider,
    getOrderHistoryForProvider,
    getFullOrdersByEventId
};
