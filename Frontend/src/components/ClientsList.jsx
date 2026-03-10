// import React, { useEffect, useState } from 'react';

// export default function ClientsList() {
//   const [clients, setClients] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const emptyClient = {
//     full_name: '',
//     email: '',
//     password: '',
//     address: '',
//     phone: ''
//   };

//   const [newClient, setNewClient] = useState(emptyClient);
//   const [editingClient, setEditingClient] = useState(null);

//   useEffect(() => {
//     fetchClients();
//   }, []);

//   async function fetchClients() {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/clients`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה בטעינת הלקוחות');
//       const data = await res.json();
//       setClients(data);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/clients/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה במחיקת הלקוח');
//       setClients(prev => prev.filter(c => c.id !== id));
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   async function handleAdd() {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/clients`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newClient),
//       });
//       if (!res.ok) throw new Error('שגיאה בהוספת לקוח');
//       setNewClient(emptyClient);
//       fetchClients();
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   async function handleUpdate() {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/clients/${editingClient.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editingClient),
//       });
//       if (!res.ok) throw new Error('שגיאה בעדכון לקוח');
//       setEditingClient(null);
//       fetchClients();
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   if (loading) return <div>טוען לקוחות...</div>;
//   if (error) return <div>שגיאה: {error}</div>;

//   return (
//     <div>
//       <h3>רשימת לקוחות</h3>
//       <ul>
//         {clients.map(client => (
//           <li key={client.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//             <div><strong>שם:</strong> {client.full_name}</div>
//             <div><strong>אימייל:</strong> {client.email}</div>
//             <div><strong>טלפון:</strong> {client.phone}</div>
//             <div><strong>כתובת:</strong> {client.address}</div>
//             <button onClick={() => setEditingClient(client)} style={{ marginInlineEnd: 8 }}>עדכון</button>
//             <button onClick={() => handleDelete(client.id)}>מחיקה</button>
//           </li>
//         ))}
//       </ul>

//       <h4>הוספת לקוח חדש</h4>
//       <input placeholder="שם מלא" value={newClient.full_name} onChange={e => setNewClient({ ...newClient, full_name: e.target.value })} />
//       <input placeholder="אימייל" value={newClient.email} onChange={e => setNewClient({ ...newClient, email: e.target.value })} />
//       <input placeholder="סיסמה" type="password" value={newClient.password} onChange={e => setNewClient({ ...newClient, password: e.target.value })} />
//       <input placeholder="טלפון" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} />
//       <input placeholder="כתובת" value={newClient.address} onChange={e => setNewClient({ ...newClient, address: e.target.value })} />
//       <button onClick={handleAdd}>הוסף</button>

//       {editingClient && (
//         <div style={{ marginTop: 20 }}>
//           <h4>עדכון לקוח</h4>
//           <input value={editingClient.full_name} onChange={e => setEditingClient({ ...editingClient, full_name: e.target.value })} />
//           <input value={editingClient.email} onChange={e => setEditingClient({ ...editingClient, email: e.target.value })} />
//           <input type="password" value={editingClient.password} onChange={e => setEditingClient({ ...editingClient, password: e.target.value })} />
//           <input value={editingClient.phone} onChange={e => setEditingClient({ ...editingClient, phone: e.target.value })} />
//           <input value={editingClient.address} onChange={e => setEditingClient({ ...editingClient, address: e.target.value })} />
//           <button onClick={handleUpdate}>שמור</button>
//           <button onClick={() => setEditingClient(null)}>ביטול</button>
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
  Stack,
  Button,
  TextField,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const emptyClient = {
  full_name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
};

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newClient, setNewClient] = useState(emptyClient);
  const [editingClient, setEditingClient] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('שגיאה בטעינת הלקוחות');
      const data = await res.json();
      setClients(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/clients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('שגיאה במחיקת הלקוח');
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleAdd() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newClient),
      });
      if (!res.ok) throw new Error('שגיאה בהוספת לקוח');
      setNewClient(emptyClient);
      setOpenAddDialog(false);
      fetchClients();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleUpdate() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/clients/${editingClient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingClient),
      });
      if (!res.ok) throw new Error('שגיאה בעדכון לקוח');
      setEditingClient(null);
      setOpenEditDialog(false);
      fetchClients();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  if (loading) return <Typography>טוען לקוחות...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  return (
    <Box dir="rtl" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        רשימת לקוחות
      </Typography>

      <Grid container spacing={3}>
        {clients.map(client => (
          <Grid item xs={12} sm={6} md={4} key={client.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  לקוח
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography><strong>שם:</strong> {client.full_name}</Typography>
                <Typography><strong>אימייל:</strong> {client.email}</Typography>
                <Typography><strong>טלפון:</strong> {client.phone}</Typography>
                <Typography><strong>כתובת:</strong> {client.address}</Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <IconButton color="primary" onClick={() => { setEditingClient(client); setOpenEditDialog(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(client.id)}>
                    <DeleteIcon />
                  </IconButton>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* כפתור לפתיחת הוספה */}
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          startIcon={<AddCircleIcon />}
          onClick={() => setOpenAddDialog(true)}
        >
          הוספת לקוח חדש
        </Button>
      </Box>

      {/* Dialog הוספה */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>הוספת לקוח חדש</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="שם מלא"
              value={newClient.full_name}
              onChange={(e) => setNewClient({ ...newClient, full_name: e.target.value })}
            />
            <TextField
              label="אימייל"
              value={newClient.email}
              onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
            />
            <TextField
              label="סיסמה"
              type="password"
              value={newClient.password}
              onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
            />
            <TextField
              label="טלפון"
              value={newClient.phone}
              onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
            />
            <TextField
              label="כתובת"
              value={newClient.address}
              onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleAdd}>הוסף</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog עדכון */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>עדכון לקוח</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="שם מלא"
              value={editingClient?.full_name || ''}
              onChange={(e) => setEditingClient({ ...editingClient, full_name: e.target.value })}
            />
            <TextField
              label="אימייל"
              value={editingClient?.email || ''}
              onChange={(e) => setEditingClient({ ...editingClient, email: e.target.value })}
            />
            <TextField
              label="סיסמה"
              type="password"
              value={editingClient?.password || ''}
              onChange={(e) => setEditingClient({ ...editingClient, password: e.target.value })}
            />
            <TextField
              label="טלפון"
              value={editingClient?.phone || ''}
              onChange={(e) => setEditingClient({ ...editingClient, phone: e.target.value })}
            />
            <TextField
              label="כתובת"
              value={editingClient?.address || ''}
              onChange={(e) => setEditingClient({ ...editingClient, address: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleUpdate}>שמור</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}