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


// import React, { useEffect, useState } from 'react';

// export default function EventOrdersList({ eventId }) {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/orders/event/${eventId}/full`, {
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
//           <li key={order.order_id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '0.5rem' }}>
//             <strong>תאריך הזמנה:</strong> {order.order_date}<br />
//             <strong>שעה:</strong> {order.order_time}<br />
//             <strong>לקוח:</strong> {order.client_name}<br />
//             <strong>ספק:</strong> {order.provider_name}<br />
//             <strong>סוג שירות:</strong> {order.service_type_name || '—'}<br />
//             <strong>סטטוס:</strong> {order.status_name}<br />
//             <strong>מיקום:</strong> {order.area_name || order.provider_address || '—'}<br />
//             <strong>מחיר כולל:</strong> {order.total_price || '—'} ₪<br />
//             <strong>הערות:</strong> {order.notes || '—'}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// import React, { useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Grid,
//   Box,
//   Divider,
// } from '@mui/material';

// export default function EventOrdersList({ eventId }) {
//   const [orders, setOrders] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(
//           `http://localhost:3001/api/orders/event/${eventId}/full`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (!res.ok) throw new Error('שגיאה בקבלת ההזמנות');
//         const data = await res.json();
//         setOrders(data);
//       } catch (err) {
//         setError(err.message || 'שגיאה כללית');
//       }
//     };

//     fetchOrders();
//   }, [eventId]);

//   if (error) {
//     return <Typography color="error">{error}</Typography>;
//   }

//   if (orders.length === 0) {
//     return <Typography>אין הזמנות לאירוע זה.</Typography>;
//   }

//   return (
//     <Box sx={{ mt: 3 }}>
//       <Typography variant="h5" gutterBottom>
//         רשימת ההזמנות
//       </Typography>

//       <Grid container spacing={3}>
//         {orders.map(order => (
//           <Grid item xs={12} sm={6} md={4} key={order.order_id}>
//             <Card sx={{ height: '100%' }}>
//               <CardContent>
//                 <Typography variant="h6" gutterBottom>
//                   {order.service_type_name || 'שירות'}
//                 </Typography>

//                 <Divider sx={{ mb: 1 }} />

//                 <Typography>
//                   <strong>תאריך:</strong>{' '}
//                   {new Date(order.order_date).toLocaleDateString('he-IL')}
//                 </Typography>

//                 <Typography>
//                   <strong>שעה:</strong> {order.order_time || '—'}
//                 </Typography>

//                 <Typography>
//                   <strong>לקוח:</strong> {order.client_name}
//                 </Typography>

//                 <Typography>
//                   <strong>ספק:</strong> {order.provider_name}
//                 </Typography>

//                 <Typography>
//                   <strong>סטטוס:</strong> {order.status_name}
//                 </Typography>

//                 <Typography>
//                   <strong>מיקום:</strong>{' '}
//                   {order.area_name || order.provider_address || '—'}
//                 </Typography>

//                 <Typography>
//                   <strong>מחיר:</strong>{' '}
//                   {order.total_price ?? '—'} ₪
//                 </Typography>

//                 <Typography sx={{ mt: 1 }}>
//                   <strong>הערות:</strong>{' '}
//                   {order.notes || '—'}
//                 </Typography>
//               </CardContent>
//             </Card>
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  Chip
} from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

export default function EventOrdersList({ eventId }) {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3001/api/orders/event/${eventId}/full`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) throw new Error('שגיאה בקבלת ההזמנות');

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message || 'שגיאה כללית');
      }
    };

    fetchOrders();
  }, [eventId]);

  const getStatusChip = (status) => {

    if (status === 'התקבלה') {
      return (
        <Chip
          label={status}
          color="success"
          icon={<CheckCircleIcon />}
          variant="filled"
          size="medium"
        />
      );
    }

    if (status === 'נדחתה') {
      return (
        <Chip
          label={status}
          color="error"
          icon={<CancelIcon />}
          variant="filled"
          size="medium"
        />
      );
    }

    return (
      <Chip
        label={status}
        color="warning"
        icon={<HourglassEmptyIcon />}
        variant="filled"
        size="medium"
      />
    );
  };

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (orders.length === 0) {
    return <Typography>אין הזמנות לאירוע זה.</Typography>;
  }

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        רשימת ההזמנות
      </Typography>

      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order.order_id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  {order.service_type_name || 'שירות'}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography>
                  <strong>תאריך:</strong>{' '}
                  {new Date(order.order_date).toLocaleDateString('he-IL')}
                </Typography>

                <Typography>
                  <strong>שעה:</strong> {order.order_time || '—'}
                </Typography>

                <Typography>
                  <strong>לקוח:</strong> {order.client_name}
                </Typography>

                <Typography>
                  <strong>ספק:</strong> {order.provider_name}
                </Typography>

                <Box sx={{ mt: 1, mb: 1 }}>
                  <strong>סטטוס:</strong>{' '}
                  {getStatusChip(order.status_name)}
                </Box>

                <Typography>
                  <strong>מיקום:</strong>{' '}
                  {order.area_name || order.provider_address || '—'}
                </Typography>

                <Typography>
                  <strong>מחיר:</strong>{' '}
                  {order.total_price ?? '—'} ₪
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>הערות:</strong>{' '}
                  {order.notes || '—'}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}