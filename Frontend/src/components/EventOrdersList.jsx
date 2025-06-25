// // components/EventOrdersList.jsx
// import React, { useEffect, useState } from 'react';

// export default function EventOrdersList({ eventId }) {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/orders/event/${eventId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!res.ok) throw new Error('שגיאה בקבלת ההזמנות');
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         setError(err.message || 'שגיאה כללית');
//       }
//     };

//     fetchOrders();
//   }, [eventId]);

//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   if (orders.length === 0) return <p>אין הזמנות לאירוע זה.</p>;

//   return (
//     <div style={{ marginTop: '1rem' }}>
//       <h3>רשימת ההזמנות:</h3>
//       <ul>
//         {orders.map((order) => (
//           <li key={order.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
//             <strong>תאריך הזמנה:</strong> {order.order_date}<br />
//             <strong>שעה:</strong> {order.order_time}<br />
//             <strong>ספק:</strong> {order.provider_id}<br />
//             <strong>סטטוס:</strong> {order.status_id}<br />
//             <strong>מחיר כולל:</strong> {order.total_price || '—'} ₪<br />
//             <strong>מיקום:</strong> {order.location || '—'}<br />
//             <strong>הערות:</strong> {order.notes || '—'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
import React, { useEffect, useState } from 'react';

export default function EventOrdersList({ eventId }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/orders/event/${eventId}/full`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('שגיאה בקבלת ההזמנות');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'שגיאה כללית');
      }
    };

    fetchOrders();
  }, [eventId]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (orders.length === 0) return <p>אין הזמנות לאירוע זה.</p>;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h3>רשימת ההזמנות:</h3>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
            <strong>תאריך הזמנה:</strong> {order.order_date}<br />
            <strong>שעה:</strong> {order.order_time}<br />
            <strong>לקוח:</strong> {order.client_name}<br />
            <strong>ספק:</strong> {order.provider_name}<br />
            <strong>סוג שירות:</strong> {order.service_type_name || '—'}<br />
            <strong>סטטוס:</strong> {order.status_name}<br />
            <strong>מיקום:</strong> {order.area_name || order.provider_address || '—'}<br />
            <strong>מחיר כולל:</strong> {order.total_price || '—'} ₪<br />
            <strong>הערות:</strong> {order.notes || '—'}
          </li>
        ))}
      </ul>
    </div>
  );
}
