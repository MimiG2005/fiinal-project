import React, { useEffect, useState } from 'react';

export default function ApprovedOrders({ providerId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchApprovedOrders() {
      try {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/orders/provider/${providerId}/approved`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות המאושרות');
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (providerId) {
      fetchApprovedOrders();
    }
  }, [providerId]);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  if (loading) return <div>טוען הזמנות מאושרות...</div>;
  if (error) return <div>שגיאה: {error}</div>;
  if (orders.length === 0) return <div>אין הזמנות מאושרות פעילות</div>;

  return (
    <div>
      <h3>הזמנות מאושרות פעילות</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orders.map(order => (
          <li
            key={order.id}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
              backgroundColor: '#e6ffe6',
            }}
          >
            <p><strong>תאריך:</strong> {formatDate(order.order_date)}</p>
            <p><strong>שעה:</strong> {order.order_time}</p>
            <p><strong>מיקום:</strong> {order.location}</p>
            <p><strong>מחיר:</strong> {order.total_price} ₪</p>
            <p><strong>הערות:</strong> {order.notes || '—'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
