// import React, { useEffect, useState } from 'react';
//  const emptyProvider = {
//     full_name: '',
//     email: '',
//     password: '',
//     phone: '',
//     address: '',
//     service_type: ''
//   };
// export default function ProvidersList() {
//   const [providers, setProviders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

 

//   const [newProvider, setNewProvider] = useState(emptyProvider);
//   const [editingProvider, setEditingProvider] = useState(null);

//   useEffect(() => {
//     fetchProviders();
//   }, []);

//   async function fetchProviders() {
//     try {
//       setLoading(true);
//       setError(null);
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/providers`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה בטעינת הספקים');
//       const data = await res.json();
//       setProviders(data);
//     } catch (e) {
//       setError(e.message);
//     } finally {
//       setLoading(false);
//     }
//   }

//   async function handleDelete(id) {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/providers/${id}`, {
//         method: 'DELETE',
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה במחיקת הספק');
//       setProviders(prev => prev.filter(p => p.id !== id));
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   async function handleAdd() {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/providers`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(newProvider),
//       });
//       if (!res.ok) throw new Error('שגיאה בהוספת ספק');
//       setNewProvider(emptyProvider);
//       fetchProviders();
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   async function handleUpdate() {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/providers/${editingProvider.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editingProvider),
//       });
//       if (!res.ok) throw new Error('שגיאה בעדכון ספק');
//       setEditingProvider(null);
//       fetchProviders();
//     } catch (e) {
//       alert('אירעה שגיאה: ' + e.message);
//     }
//   }

//   if (loading) return <div>טוען ספקים...</div>;
//   if (error) return <div>שגיאה: {error}</div>;

//   return (





    
//     <div style={{ paddingTop: '80px' }}>
//       <h3>רשימת ספקים</h3>
//       <ul>
//         {providers.map(provider => (
//           <li key={provider.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
//             <div><strong>שם:</strong> {provider.full_name}</div>
//             <div><strong>אימייל:</strong> {provider.email}</div>
//             <div><strong>טלפון:</strong> {provider.phone}</div>
//             <div><strong>כתובת:</strong> {provider.address}</div>
//             <div><strong>סוג שירות:</strong> {provider.service_type}</div>
//             <button onClick={() => setEditingProvider(provider)} style={{ marginInlineEnd: 8 }}>עדכון</button>
//             <button onClick={() => handleDelete(provider.id)}>מחיקה</button>
//           </li>
//         ))}
//       </ul>

//       <h4>הוספת ספק חדש</h4>
//       <input name="full_name_provider" placeholder="שם מלא" value={newProvider.full_name} onChange={e => setNewProvider({ ...newProvider, full_name: e.target.value })} />
//       <input name="provider_email" placeholder="אימייל" value={newProvider.email} onChange={e => setNewProvider({ ...newProvider, email: e.target.value })} />
//       <input name="password_provideer" placeholder="סיסמה" type="password" value={newProvider.password} onChange={e => setNewProvider({ ...newProvider, password: e.target.value })} />
//       <input name="phone" placeholder="טלפון" value={newProvider.phone} onChange={e => setNewProvider({ ...newProvider, phone: e.target.value })} />
//       <input name="addres" placeholder="כתובת" value={newProvider.address} onChange={e => setNewProvider({ ...newProvider, address: e.target.value })} />
//       <input name="type" placeholder="סוג שירות" value={newProvider.service_type} onChange={e => setNewProvider({ ...newProvider, service_type: e.target.value })} />
//       <button onClick={handleAdd}>הוסף</button>

//       {editingProvider && (
//         <div style={{ marginTop: 20 }}>
//           <h4>עדכון ספק</h4>
//           <input value={editingProvider.full_name} onChange={e => setEditingProvider({ ...editingProvider, full_name: e.target.value })} />
//           <input value={editingProvider.email} onChange={e => setEditingProvider({ ...editingProvider, email: e.target.value })} />
//           <input type="password" value={editingProvider.password} onChange={e => setEditingProvider({ ...editingProvider, password: e.target.value })} />
//           <input value={editingProvider.phone} onChange={e => setEditingProvider({ ...editingProvider, phone: e.target.value })} />
//           <input value={editingProvider.address} onChange={e => setEditingProvider({ ...editingProvider, address: e.target.value })} />
//           <input value={editingProvider.service_type} onChange={e => setEditingProvider({ ...editingProvider, service_type: e.target.value })} />
//           <button onClick={handleUpdate}>שמור</button>
//           <button onClick={() => setEditingProvider(null)}>ביטול</button>
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
import ServiceTypeSelector from './ServiceTypeSelector';

const emptyProvider = {
  full_name: '',
  email: '',
  password: '',
  phone: '',
  address: '',
  service_type: '',
};

export default function ProvidersList() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [newProvider, setNewProvider] = useState(emptyProvider);
  const [editingProvider, setEditingProvider] = useState(null);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [serviceTypes, setServiceTypes] = useState({});
  useEffect(() => {
    fetchProviders();
    fetchServiceTypes();
  }, []);

  async function fetchProviders() {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/providers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('שגיאה בטעינת הספקים');
      const data = await res.json();
      setProviders(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }
   async function fetchServiceTypes() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/service-types`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('שגיאה בטעינת סוגי השירותים');
        const data = await res.json();
        const mapping = {};
        data.forEach(st => {
          mapping[st.id] = st.name;
        });
        setServiceTypes(mapping);
      } catch (e) {
        console.error(e.message);
      }
    }

  async function handleDelete(id) {
    console.log(id)
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/providers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('שגיאה במחיקת הספק');
      setProviders(prev => prev.filter(p => p.id !== id));
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleAdd() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProvider),
      });
      if (!res.ok) throw new Error('שגיאה בהוספת ספק');
      setNewProvider(emptyProvider);
      setOpenAddDialog(false);
      fetchProviders();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleUpdate() {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/providers/${editingProvider.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingProvider),
      });
      if (!res.ok) throw new Error('שגיאה בעדכון ספק');
      setEditingProvider(null);
      setOpenEditDialog(false);
      fetchProviders();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  if (loading) return <Typography>טוען ספקים...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  return (
    <Box dir="rtl" sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        רשימת ספקים
      </Typography>

      <Grid container spacing={3}>
        {providers.map((provider) => (
          <Grid item xs={12} sm={6} md={4} key={provider.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ספק
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Typography><strong>שם:</strong> {provider.full_name}</Typography>
                <Typography><strong>אימייל:</strong> {provider.email}</Typography>
                <Typography><strong>טלפון:</strong> {provider.phone}</Typography>
                <Typography><strong>כתובת:</strong> {provider.address}</Typography>
                <Typography>
                  <strong>סוג שירות:</strong> {serviceTypes[provider.service_type_id] || provider.service_type_id}
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <IconButton color="primary" onClick={() => { setEditingProvider(provider); setOpenEditDialog(true); }}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(provider.id)}>
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
          הוספת ספק חדש
        </Button>
      </Box>

      {/* Dialog הוספה */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>הוספת ספק חדש</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="שם מלא"
              value={newProvider.full_name}
              onChange={(e) => setNewProvider({ ...newProvider, full_name: e.target.value })}
            />
            <TextField
              label="אימייל"
              value={newProvider.email}
              onChange={(e) => setNewProvider({ ...newProvider, email: e.target.value })}
            />
            <TextField
              label="סיסמה"
              type="password"
              value={newProvider.password}
              onChange={(e) => setNewProvider({ ...newProvider, password: e.target.value })}
            />
            <TextField
              label="טלפון"
              value={newProvider.phone}
              onChange={(e) => setNewProvider({ ...newProvider, phone: e.target.value })}
            />
            <TextField
              label="כתובת"
              value={newProvider.address}
              onChange={(e) => setNewProvider({ ...newProvider, address: e.target.value })}
            />
            <ServiceTypeSelector
              selectedId={newProvider.service_type}
         
              onSelect={(id) => setNewProvider({ ...newProvider, service_type_id: id })}
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
        <DialogTitle>עדכון ספק</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>
            <TextField
              label="שם מלא"
              value={editingProvider?.full_name || ''}
              onChange={(e) => setEditingProvider({ ...editingProvider, full_name: e.target.value })}
            />
            <TextField
              label="אימייל"
              value={editingProvider?.email || ''}
              onChange={(e) => setEditingProvider({ ...editingProvider, email: e.target.value })}
            />
            <TextField
              label="סיסמה"
              type="password"
              value={editingProvider?.password || ''}
              onChange={(e) => setEditingProvider({ ...editingProvider, password: e.target.value })}
            />
            <TextField
              label="טלפון"
              value={editingProvider?.phone || ''}
              onChange={(e) => setEditingProvider({ ...editingProvider, phone: e.target.value })}
            />
            <TextField
              label="כתובת"
              value={editingProvider?.address || ''}
              onChange={(e) => setEditingProvider({ ...editingProvider, address: e.target.value })}
            />
            <ServiceTypeSelector
              selectedId={editingProvider?.service_type || ''}
              onSelect={(id) => setEditingProvider({ ...editingProvider, service_type: id })}
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