// import React, { useEffect, useState } from 'react';

// export default function OrdersList() {
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // דוגמת אובייקט הזמנה ריקה להוספה
//   const emptyOrder = {
//     client_name: '',
//     provider_name: '',
//     service_type: '',
//     order_date: '',
//     status: ''
//   };

//   const [newOrder, setNewOrder] = useState(emptyOrder);
//   const [editingOrder, setEditingOrder] = useState(null);

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   async function fetchOrders() {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/orders`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה בטעינת ההזמנות');
//       const data = await res.json();
//       setOrders(data);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה במחיקת ההזמנה');
//       setOrders(prev => prev.filter(o => o.id !== id));
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   async function handleAdd() {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/orders`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newOrder),
//       });
//       if (!res.ok) throw new Error('שגיאה בהוספת הזמנה');
//       setNewOrder(emptyOrder);
//       fetchOrders();
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   async function handleUpdate() {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/orders/${editingOrder.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editingOrder),
//       });
//       if (!res.ok) throw new Error('שגיאה בעדכון ההזמנה');
//       setEditingOrder(null);
//       fetchOrders();
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   if (loading) return <div>טוען הזמנות...</div>;
//   if (error) return <div>שגיאה: {error}</div>;

//   return (
//     <div style={{ paddingTop: '100px' }}>
//       <h3>רשימת הזמנות</h3>
//       <ul>
//         {orders.map(order => (
//           <li key={order.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//             <div><strong>שם לקוח:</strong> {order.client_name}</div>
//             <div><strong>שם ספק:</strong> {order.provider_name}</div>
//             <div><strong>סוג שירות:</strong> {order.service_type}</div>
//             <div><strong>תאריך הזמנה:</strong> {order.order_date}</div>
//             <div><strong>סטטוס:</strong> {order.status}</div>
//             <button onClick={() => setEditingOrder(order)} style={{ marginInlineEnd: 8 }}>עדכון</button>
//             <button onClick={() => handleDelete(order.id)}>מחיקה</button>
//           </li>
//         ))}
//       </ul>

//       <h4>הוספת הזמנה חדשה</h4>
//       <input placeholder="שם לקוח" value={newOrder.client_name} onChange={e => setNewOrder({ ...newOrder, client_name: e.target.value })} />
//       <input placeholder="שם ספק" value={newOrder.provider_name} onChange={e => setNewOrder({ ...newOrder, provider_name: e.target.value })} />
//       <input placeholder="סוג שירות" value={newOrder.service_type} onChange={e => setNewOrder({ ...newOrder, service_type: e.target.value })} />
//       <input type="date" placeholder="תאריך הזמנה" value={newOrder.order_date} onChange={e => setNewOrder({ ...newOrder, order_date: e.target.value })} />
//       <input placeholder="סטטוס" value={newOrder.status} onChange={e => setNewOrder({ ...newOrder, status: e.target.value })} />
//       <button onClick={handleAdd}>הוסף</button>

//       {editingOrder && (
//         <div style={{ marginTop: 20 }}>
//           <h4>עדכון הזמנה</h4>
//           {console.log(editingOrder)}
//           <input value={editingOrder.client_name} onChange={e => setEditingOrder({ ...editingOrder, client_name: e.target.value })} />
//           <input value={editingOrder.provider_name} onChange={e => setEditingOrder({ ...editingOrder, provider_name: e.target.value })} />
//           <input value={editingOrder.service_type} onChange={e => setEditingOrder({ ...editingOrder, service_type: e.target.value })} />
//           <input type="date" value={editingOrder.order_date} onChange={e => setEditingOrder({ ...editingOrder, order_date: e.target.value })} />
//           <input value={editingOrder.status} onChange={e => setEditingOrder({ ...editingOrder, status: e.target.value })} />
//           <button onClick={handleUpdate}>שמור</button>
//           <button onClick={() => setEditingOrder(null)}>ביטול</button>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  TextField,
  Stack,
  Divider
} from '@mui/material';

export default function OrdersList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const emptyOrder = {
    client_name: '',
    provider_name: '',
    service_type: '',
    order_date: '',
    status: ''
  };
  const [newOrder, setNewOrder] = useState(emptyOrder);
  const [editingOrder, setEditingOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/orders`, {
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

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/orders/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('שגיאה במחיקת ההזמנה');
      setOrders(prev => prev.filter(o => o.id !== id));
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleAdd() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newOrder),
      });
      if (!res.ok) throw new Error('שגיאה בהוספת הזמנה');
      setNewOrder(emptyOrder);
      fetchOrders();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleUpdate() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/orders/${editingOrder.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingOrder),
      });
      if (!res.ok) throw new Error('שגיאה בעדכון ההזמנה');
      setEditingOrder(null);
      fetchOrders();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  if (loading) return <Typography>טוען הזמנות...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        רשימת הזמנות
      </Typography>

      <Grid container spacing={3}>
        {orders.map(order => (
          <Grid item xs={12} sm={6} md={4} key={order.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  הזמנה
                </Typography>
                <Divider sx={{ mb: 1 }} />

                <Typography><strong>שם לקוח:</strong> {order.client_name}</Typography>
                <Typography><strong>שם ספק:</strong> {order.provider_name}</Typography>
                <Typography><strong>סוג שירות:</strong> {order.service_type}</Typography>
                <Typography><strong>תאריך הזמנה:</strong> {order.order_date}</Typography>
                <Typography><strong>סטטוס:</strong> {order.status}</Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Button variant="contained" onClick={() => setEditingOrder(order)}>
                    עדכון
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleDelete(order.id)}>
                    מחיקה
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          הוספת הזמנה חדשה
        </Typography>
        <Stack spacing={2} direction="column" maxWidth={400}>
          <TextField
            label="שם לקוח"
            value={newOrder.client_name}
            onChange={e => setNewOrder({ ...newOrder, client_name: e.target.value })}
          />
          <TextField
            label="שם ספק"
            value={newOrder.provider_name}
            onChange={e => setNewOrder({ ...newOrder, provider_name: e.target.value })}
          />
          <TextField
            label="סוג שירות"
            value={newOrder.service_type}
            onChange={e => setNewOrder({ ...newOrder, service_type: e.target.value })}
          />
          <TextField
            label="תאריך הזמנה"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={newOrder.order_date}
            onChange={e => setNewOrder({ ...newOrder, order_date: e.target.value })}
          />
          <TextField
            label="סטטוס"
            value={newOrder.status}
            onChange={e => setNewOrder({ ...newOrder, status: e.target.value })}
          />
          <Button variant="contained" onClick={handleAdd}>
            הוסף הזמנה
          </Button>
        </Stack>
      </Box>

      {editingOrder && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            עדכון הזמנה
          </Typography>
          <Stack spacing={2} maxWidth={400}>
            <TextField
              label="שם לקוח"
              value={editingOrder.client_name}
              onChange={e => setEditingOrder({ ...editingOrder, client_name: e.target.value })}
            />
            <TextField
              label="שם ספק"
              value={editingOrder.provider_name}
              onChange={e => setEditingOrder({ ...editingOrder, provider_name: e.target.value })}
            />
            <TextField
              label="סוג שירות"
              value={editingOrder.service_type}
              onChange={e => setEditingOrder({ ...editingOrder, service_type: e.target.value })}
            />
            <TextField
              label="תאריך הזמנה"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={editingOrder.order_date}
              onChange={e => setEditingOrder({ ...editingOrder, order_date: e.target.value })}
            />
            <TextField
              label="סטטוס"
              value={editingOrder.status}
              onChange={e => setEditingOrder({ ...editingOrder, status: e.target.value })}
            />
            <Stack direction="row" spacing={2}>
              <Button variant="contained" onClick={handleUpdate}>
                שמור
              </Button>
              <Button variant="outlined" onClick={() => setEditingOrder(null)}>
                ביטול
              </Button>
            </Stack>
          </Stack>
        </Box>
      )}
    </Box>
  );
}
