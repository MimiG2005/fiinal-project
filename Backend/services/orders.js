import { con } from '../db.js';

export const QueryOrderById = (id) => {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM orders WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const QueryListOfOrders = () => {
  return new Promise((resolve, reject) => {
    con.query("SELECT * FROM orders", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const QueryOrdersByClientId = (clientId) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM orders WHERE client_id = ?",
      [clientId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryOrdersByEventId = (eventId) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM orders WHERE event_id = ?",
      [eventId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryCreateOrder = (order) => {
  const {
    event_id,
    client_id,
    provider_id,
    order_date,
    order_time,
    total_price,
    location,
    status_id,
    notes
  } = order;

  return new Promise((resolve, reject) => {
    con.query(
      `INSERT INTO orders 
        (event_id, client_id, provider_id, order_date, order_time, total_price, location, status_id, notes) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        event_id,
        client_id,
        provider_id,
        order_date,
        order_time,
        total_price || null,
        location || null,
        status_id,
        notes || null
      ],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryUpdateOrder = (id, order) => {
  return new Promise((resolve, reject) => {
    con.query(
      "UPDATE orders SET ? WHERE id = ?",
      [order, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryDeleteOrder = (id) => {
  return new Promise((resolve, reject) => {
    con.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export const QueryPendingOrdersByProviderId = (providerId, statusId) => {
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM orders WHERE provider_id = ? AND status_id = ?`,
      [providerId, statusId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};


export const QueryUpdateOrderStatus = (orderId, statusId) => {
  return new Promise((resolve, reject) => {
    con.query(
      "UPDATE orders SET status_id = ? WHERE id = ?",
      [statusId, orderId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryApprovedOrdersByProviderId = (providerId, statusId = 1) => {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM orders 
       WHERE provider_id = ? 
       AND status_id = ? 
       AND order_date >= ?`,
      [providerId, statusId, today],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryOrderHistoryByProviderId = (providerId, statusId = 1) => {
  const today = new Date().toISOString().split('T')[0];
  return new Promise((resolve, reject) => {
    con.query(
      `SELECT * FROM orders 
       WHERE provider_id = ? 
       AND status_id = ? 
       AND order_date < ?`,
      [providerId, statusId, today],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export const QueryFullOrdersByEventId = (eventId) => {
  return new Promise((resolve, reject) => {
    con.query(
      "SELECT * FROM view_full_order_details WHERE event_id = ?",
      [eventId],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

