// import React, { useEffect, useState } from 'react';
// import { useContext } from 'react';
// import { userContext } from '../context/userContext';
// import { useCallback } from 'react';

// export default function ApprovedOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useContext(userContext);
//   console.log(currentUser);
//   const fetchApprovedOrders = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/orders/provider/${currentUser.id}/approved`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות המאושרות');
//       const data = await res.json();
//       setOrders(data);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }, [currentUser]);
//   useEffect(() => {
//     if (currentUser) {



//       fetchApprovedOrders();
//     }
//   }, [currentUser]);

//   function formatDate(dateStr) {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('he-IL', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//   }

//   if (loading) return <div>טוען הזמנות מאושרות...</div>;
//   if (error) return <div>שגיאה: {error}</div>;
//   if (orders.length === 0) return <div>אין הזמנות מאושרות פעילות</div>;

//   return (
//     <div>
//       <h3>הזמנות מאושרות פעילות</h3>
//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//         {orders.map(order => (
//           <li
//             key={order.id}
//             style={{
//               marginBottom: '1rem',
//               padding: '1rem',
//               border: '1px solid #ccc',
//               borderRadius: '8px',
//               backgroundColor: '#e6ffe6',
//             }}
//           >
//             <p><strong>תאריך:</strong> {formatDate(order.order_date)}</p>
//             <p><strong>שעה:</strong> {order.order_time}</p>
//             <p><strong>מיקום:</strong> {order.location}</p>
//             <p><strong>מחיר:</strong> {order.total_price} ₪</p>
//             <p><strong>הערות:</strong> {order.notes || '—'}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState, useContext, useCallback } from 'react';
import { userContext } from '../context/userContext';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider
} from '@mui/material';

export default function ApprovedOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(userContext);

  const fetchApprovedOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const res = await fetch(
        `http://localhost:3001/api/orders/provider/${currentUser.id}/approved`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות המאושרות');

      const data = await res.json();
      setOrders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      fetchApprovedOrders();
    }
  }, [currentUser, fetchApprovedOrders]);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  }

  if (loading) return <Typography>טוען הזמנות מאושרות...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (orders.length === 0)
    return <Typography>אין הזמנות מאושרות פעילות</Typography>;

  return (
    <Box dir="rtl" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        הזמנות מאושרות פעילות
      </Typography>

      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card
              sx={{
                height: '100%',
                borderLeft: '6px solid #4caf50'
              }}
            >
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  הזמנה מאושרת
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Typography>
                  <strong>תאריך:</strong> {formatDate(order.order_date)}
                </Typography>

                <Typography>
                  <strong>שעה:</strong> {order.order_time}
                </Typography>

                <Typography>
                  <strong>מיקום:</strong> {order.location}
                </Typography>

                <Typography>
                  <strong>מחיר:</strong> {order.total_price} ₪
                </Typography>

                <Typography sx={{ mt: 1 }}>
                  <strong>הערות:</strong> {order.notes || '—'}
                </Typography>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}