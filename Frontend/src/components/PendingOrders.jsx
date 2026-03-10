// import React, { useEffect, useState } from 'react';
// import { useContext } from 'react';
// import { use } from 'react';
// import { userContext } from '../context/userContext';

// export default function PendingOrders() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { currentUser } = useContext(userContext);
//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         setLoading(true);
//         setError(null);
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/orders/provider/${currentUser.id}/pending`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות');
//         const data = await res.json();
//         setOrders(data);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     if (currentUser) {
//       fetchOrders();
//     }
//   }, [currentUser]);

//   async function approveOrder(orderId,numStatus) {
//     try {
//       const token = localStorage.getItem('token');
      
//       const res = await fetch(`http://localhost:3001/api/orders/${orderId}/status`, 
//         {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         }, 
//           body: JSON.stringify({ status_id: numStatus }), // סטטוס מאושר
//       });
//       if (!res.ok) throw new Error('שגיאה באישור ההזמנה');

//       // הסרת ההזמנה מהרשימה
//       setOrders(prevOrders => prevOrders.filter(order => order.id !== orderId));

//       // יידוע ההורה אם יש פונקציה כזו

//     } catch (e) {
//       alert('אירעה שגיאה באישור ההזמנה: ' + e.message);
//     }
//   }

//   function formatDate(dateStr) {
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('he-IL', {
//       day: '2-digit',
//       month: '2-digit',
//       year: 'numeric',
//     });
//   }

//   if (loading) return <div>טוען הזמנות...</div>;
//   if (error) return <div>שגיאה: {error}</div>;
//   if (orders.length === 0) return <div>אין הזמנות בהמתנה</div>;

//   return (
//     <div>
//       <h3>הזמנות בהמתנה</h3>
//       <ul>
//         {orders.map(order => (
//           <li key={order.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//             <div><strong>תאריך:</strong> {formatDate(order.order_date)}</div>
//             <div><strong>שעה:</strong> {order.order_time}</div>
//             <div><strong>מיקום:</strong> {order.location}</div>
//             <div><strong>מחיר:</strong> {order.total_price} ₪</div>
//             <div><strong>הערות:</strong> {order.notes || '—'}</div>
//             <button
//               onClick={() => approveOrder(order.id,1)}
//               style={{ marginTop: 8, padding: '6px 12px', cursor: 'pointer' }}
//             >
//               אישור הזמנה
//             </button>

//             <button
//               onClick={() => approveOrder(order.id,3)}
//               style={{ marginTop: 8, padding: '6px 12px', cursor: 'pointer' }}
//             >
//               דחיית הזמנה
//             </button>
            
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
  Divider,
  Button,
  Stack
} from '@mui/material';

export default function PendingOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(userContext);

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');

        const res = await fetch(
          `http://localhost:3001/api/orders/provider/${currentUser.id}/pending`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות');

        const data = await res.json();
        setOrders(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  async function approveOrder(orderId, numStatus) {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(
        `http://localhost:3001/api/orders/${orderId}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status_id: numStatus }),
        }
      );

      if (!res.ok) throw new Error('שגיאה באישור ההזמנה');

      setOrders(prev =>
        prev.filter(order => order.id !== orderId)
      );
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
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

  if (loading) return <Typography>טוען הזמנות...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;
  if (orders.length === 0)
    return <Typography>אין הזמנות בהמתנה</Typography>;

  return (
    <Box dir="rtl" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        הזמנות בהמתנה
      </Typography>

      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card
              sx={{
                height: '100%',
                borderLeft: '6px solid #ff9800'
              }}
            >
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  הזמנה ממתינה
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

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{ mt: 2 }}
                >
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => approveOrder(order.id, 1)}
                  >
                    אישור
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => approveOrder(order.id, 3)}
                  >
                    דחייה
                  </Button>
                </Stack>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}   
