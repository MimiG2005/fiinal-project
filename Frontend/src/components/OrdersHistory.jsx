import React, { useEffect, useState } from 'react';

export default function OrdersHistory({ providerId }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/orders/provider/${providerId}/history`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('שגיאה בטעינת היסטוריית ההזמנות');
        const data = await res.json();
        setOrders(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (providerId) {
      fetchHistory();
    }
  }, [providerId]);

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('he-IL');

  if (loading) return <div>טוען היסטוריה...</div>;
  if (error) return <div>שגיאה: {error}</div>;
  if (orders.length === 0) return <div>אין הזמנות ישנות</div>;

  return (
    <div>
      <h3>היסטוריית הזמנות</h3>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {orders.map(order => (
          <li key={order.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
            <div><strong>תאריך:</strong> {formatDate(order.order_date)}</div>
            <div><strong>שעה:</strong> {order.order_time}</div>
            <div><strong>מיקום:</strong> {order.location}</div>
            <div><strong>מחיר:</strong> {order.total_price} ₪</div>
            <div><strong>הערות:</strong> {order.notes || '—'}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
// import React, { useEffect, useState } from 'react';

// export default function ViewEventsPage({ clientId, onEventSelect }) {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/events/client/${clientId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
//         setEvents(await res.json());
//       } catch (err) {
//         setError(err.message || 'שגיאה כללית');
//       }
//     };
//     fetchEvents();
//   }, [clientId]);

//   const isFutureDate = dateStr => dateStr >= new Date().toISOString().split('T')[0];
//   const formatDate = dateStr => new Date(dateStr).toLocaleDateString('he-IL');

//   return (
//     <div>
//       <h2>רשימת האירועים שלך</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {events.length === 0 ? (
//         <p>אין אירועים להצגה</p>
//       ) : (
//         <ul>
//           {events.map(evt => (
//             <li key={evt.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
//               <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}<br />
// <strong>תאריך:</strong> {new Date(evt.event_date).toLocaleDateString('he-IL')}
//               <strong>מחיר:</strong> {evt.price} ₪<br />
//               {isFutureDate(evt.event_date) ? (
//                 <button className="button" onClick={() => onEventSelect(evt)}>
//                   עדכן אירוע
//                 </button>
//               ) : (
//                 <button className="button" disabled style={{ backgroundColor: '#ccc' }}>
//                   אירוע עבר
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';

// export default function ViewEventsPage({ clientId, onEventSelect }) {
//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/events/client/${clientId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
//         setEvents(await res.json());
//       } catch (err) {
//         setError(err.message || 'שגיאה כללית');
//       }
//     };
//     fetchEvents();
//   }, [clientId]);

//   // פונקציה לעיצוב תאריך
// //   const formatDate = (dateStr) =>
// //     new Date(dateStr).toLocaleDateString('he-IL', {
// //       day: '2-digit',
// //       month: '2-digit',
// //       year: 'numeric',
// //     });
// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   if (isNaN(date.getTime())) return 'תאריך לא תקין';
//   return date.toLocaleDateString('he-IL', {
//     day: '2-digit',
//     month: '2-digit',
//     year: 'numeric',
//   });
// };

//   const isFutureDate = (dateStr) => dateStr >= new Date().toISOString().split('T')[0];

//   return (
//     <div>
//       <h2>רשימת האירועים שלך</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {events.length === 0 ? (
//         <p>אין אירועים להצגה</p>
//       ) : (
//         <ul>
//           {events.map((evt) => (
//             <li
//               key={evt.id}
//               style={{
//                 marginBottom: '1rem',
//                 borderBottom: '1px solid #ccc',
//                 paddingBottom: '1rem',
//               }}
//             >
//               <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}<br />
//               <strong>תאריך:</strong> {formatDate(evt.event_date)}<br />
//               <strong>מחיר:</strong> {evt.price} ₪<br />
//               {isFutureDate(evt.event_date) ? (
//                 <button className="button" onClick={() => onEventSelect(evt)}>
//                   עדכן אירוע
//                 </button>
//               ) : (
//                 <button className="button" disabled style={{ backgroundColor: '#ccc' }}>
//                   אירוע עבר
//                 </button>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }
