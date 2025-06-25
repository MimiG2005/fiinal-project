import React, { useEffect, useState } from 'react';

export default function PendingOrders({ providerId, onOrderApproved }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/orders/provider/${providerId}/pending`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות');
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (providerId) {
      fetchOrders();
    }
  }, [providerId]);

  async function approveOrder(orderId) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status_id: 1 }), // סטטוס מאושר
      });
      if (!res.ok) throw new Error('שגיאה באישור ההזמנה');

      // הסרת ההזמנה מהרשימה
      setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));

      // יידוע ההורה אם יש פונקציה כזו
      if (onOrderApproved) onOrderApproved(orderId);
    } catch (e) {
      alert('אירעה שגיאה באישור ההזמנה: ' + e.message);
    }
  }

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  if (loading) return <div>טוען הזמנות...</div>;
  if (error) return <div>שגיאה: {error}</div>;
  if (orders.length === 0) return <div>אין הזמנות בהמתנה</div>;

  return (
    <div>
      <h3>הזמנות בהמתנה</h3>
      <ul>
        {orders.map(order => (
          <li key={order.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
            <div><strong>תאריך:</strong> {formatDate(order.order_date)}</div>
            <div><strong>שעה:</strong> {order.order_time}</div>
            <div><strong>מיקום:</strong> {order.location}</div>
            <div><strong>מחיר:</strong> {order.total_price} ₪</div>
            <div><strong>הערות:</strong> {order.notes || '—'}</div>
            <button
              onClick={() => approveOrder(order.id)}
              style={{ marginTop: 8, padding: '6px 12px', cursor: 'pointer' }}
            >
              אישור הזמנה
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

