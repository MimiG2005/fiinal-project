// import React, { useEffect, useState } from 'react';
// import { useContext } from 'react';
// import { userContext } from '../context/userContext';

// export default function OrdersHistory() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useContext(userContext);
//   useEffect(() => {
//     if (currentUser) {
//       async function fetchHistory() {

//         try {
//           setLoading(true);
//           const token = localStorage.getItem('token');
//           const res = await fetch(`http://localhost:3001/api/orders/provider/${currentUser.id}/history`, {
//             headers: { Authorization: `Bearer ${token}` },
//           });
//           if (!res.ok) throw new Error('שגיאה בטעינת היסטוריית ההזמנות');
//           const data = await res.json();
//           setOrders(data);
//         } catch (e) {
//           setError(e.message);
//         } finally {
//           setLoading(false);
//         }
//       }
//       fetchHistory();
//     }
//   }, [currentUser]);

//   const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('he-IL');

//   if (loading) return <div>טוען היסטוריה...</div>;
//   if (error) return <div>שגיאה: {error}</div>;
//   if (orders.length === 0) return <div>אין הזמנות ישנות</div>;

//   return (
//     <div>
//       <h3>היסטוריית הזמנות</h3>
//       <ul style={{ listStyleType: 'none', padding: 0 }}>
//         {orders.map(order => (
//           <li key={order.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//             <div><strong>תאריך:</strong> {formatDate(order.order_date)}</div>
//             <div><strong>שעה:</strong> {order.order_time}</div>
//             <div><strong>מיקום:</strong> {order.location}</div>
//             <div><strong>מחיר:</strong> {order.total_price} ₪</div>
//             <div><strong>הערות:</strong> {order.notes || '—'}</div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useEffect, useState, useContext } from 'react';
import { userContext } from '../context/userContext';

import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider
} from '@mui/material';

export default function OrdersHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    if (currentUser) {
      async function fetchHistory() {
        try {
          setLoading(true);

          const token = localStorage.getItem('token');

          const res = await fetch(
            `http://localhost:3001/api/orders/provider/${currentUser.id}/history`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          if (!res.ok) throw new Error('שגיאה בטעינת היסטוריית ההזמנות');

          const data = await res.json();
          setOrders(data);
        } catch (e) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
      }

      fetchHistory();
    }
  }, [currentUser]);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('he-IL');

  if (loading) return <Typography>טוען היסטוריה...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (orders.length === 0)
    return <Typography>אין הזמנות ישנות</Typography>;

  return (
    <Box dir="rtl" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        היסטוריית הזמנות
      </Typography>

      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card
              sx={{
                height: '100%',
                borderLeft: '6px solid #9e9e9e'
              }}
            >
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  הזמנה קודמת
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