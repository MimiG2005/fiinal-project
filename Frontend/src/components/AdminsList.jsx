// // import React, { useEffect, useState } from 'react';

// // export default function AdminsList() {
// //   const [admins, setAdmins] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   const emptyAdmin = {
// //     full_name: '',
// //     email: '',
// //     password: '',
// //     phone: ''
// //   };

// //   const [newAdmin, setNewAdmin] = useState(emptyAdmin);
// //   const [editingAdmin, setEditingAdmin] = useState(null);

// //   useEffect(() => {
// //     fetchAdmins();
// //   }, []);

// //   async function fetchAdmins() {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const token = localStorage.getItem('token');
// //       const res = await fetch(`http://localhost:3001/api/admins`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (!res.ok) throw new Error('שגיאה בטעינת המנהלים');
// //       const data = await res.json();
// //       setAdmins(data);
// //     } catch (e) {
// //       setError(e.message);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }

// //   async function handleDelete(id) {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const res = await fetch(`http://localhost:3001/api/admins/${id}`, {
// //         method: 'DELETE',
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (!res.ok) throw new Error('שגיאה במחיקת המנהל');
// //       setAdmins(prev => prev.filter(a => a.id !== id));
// //     } catch (e) {
// //       alert('אירעה שגיאה: ' + e.message);
// //     }
// //   }

// //   async function handleAdd() {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const res = await fetch(`http://localhost:3001/api/admins`, {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(newAdmin),
// //       });
// //       if (!res.ok) throw new Error('שגיאה בהוספת מנהל');
// //       setNewAdmin(emptyAdmin);
// //       fetchAdmins();
// //     } catch (e) {
// //       alert('אירעה שגיאה: ' + e.message);
// //     }
// //   }

// //   async function handleUpdate() {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const res = await fetch(`http://localhost:3001/api/admins/${editingAdmin.id}`, {
// //         method: 'PUT',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(editingAdmin),
// //       });
// //       if (!res.ok) throw new Error('שגיאה בעדכון מנהל');
// //       setEditingAdmin(null);
// //       fetchAdmins();
// //     } catch (e) {
// //       alert('אירעה שגיאה: ' + e.message);
// //     }
// //   }

// //   if (loading) return <div>טוען מנהלים...</div>;
// //   if (error) return <div>שגיאה: {error}</div>;

// //   return (
// //     <div>
// //       <h3>רשימת מנהלים</h3>
// //       <ul>
// //         {admins.map(admin => (
// //           <li key={admin.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
// //             <div><strong>שם:</strong> {admin.full_name}</div>
// //             <div><strong>אימייל:</strong> {admin.email}</div>
// //             <div><strong>טלפון:</strong> {admin.phone}</div>
// //             <button onClick={() => setEditingAdmin(admin)} style={{ marginInlineEnd: 8 }}>עדכון</button>
// //             <button onClick={() => handleDelete(admin.id)}>מחיקה</button>
// //           </li>
// //         ))}
// //       </ul>

// //       <h4>הוספת מנהל חדש</h4>
// //       <input placeholder="שם מלא" value={newAdmin.full_name} onChange={e => setNewAdmin({ ...newAdmin, full_name: e.target.value })} />
// //       <input placeholder="אימייל" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} />
// //       <input placeholder="סיסמה" type="password" value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} />
// //       <input placeholder="טלפון" value={newAdmin.phone} onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })} />
// //       <button onClick={handleAdd}>הוסף</button>

// //       {editingAdmin && (
// //         <div style={{ marginTop: 20 }}>
// //           <h4>עדכון מנהל</h4>
// //           <input value={editingAdmin.full_name} onChange={e => setEditingAdmin({ ...editingAdmin, full_name: e.target.value })} />
// //           <input value={editingAdmin.email} onChange={e => setEditingAdmin({ ...editingAdmin, email: e.target.value })} />
// //           <input type="password" value={editingAdmin.password} onChange={e => setEditingAdmin({ ...editingAdmin, password: e.target.value })} />
// //           <input value={editingAdmin.phone} onChange={e => setEditingAdmin({ ...editingAdmin, phone: e.target.value })} />
// //           <button onClick={handleUpdate}>שמור</button>
// //           <button onClick={() => setEditingAdmin(null)}>ביטול</button>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


//   import React, { useEffect, useState } from 'react';
//   import {
//     Box,
//     Card,
//     CardContent,
//     Typography,
//     Grid,
//     Button,
//     TextField,
//     Stack,
//     Divider
//   } from '@mui/material';

//   export default function AdminsList() {
//     const [admins, setAdmins] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     const emptyAdmin = {
//       full_name: '',
//       email: '',
//       password: '',
//       phone: ''
//     };
//     const [newAdmin, setNewAdmin] = useState(emptyAdmin);
//     const [editingAdmin, setEditingAdmin] = useState(null);

//     useEffect(() => {
//       fetchAdmins();
//     }, []);

//     async function fetchAdmins() {
//       try {
//         setLoading(true);
//         setError(null);
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/admins`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('שגיאה בטעינת המנהלים');
//         const data = await res.json();
//         setAdmins(data);
//       } catch (e) {
//         setError(e.message);
//       } finally {
//         setLoading(false);
//       }
//     }

//     async function handleDelete(id) {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/admins/${id}`, {
//           method: 'DELETE',
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         if (!res.ok) throw new Error('שגיאה במחיקת המנהל');
//         setAdmins(prev => prev.filter(a => a.id !== id));
//       } catch (e) {
//         alert('אירעה שגיאה: ' + e.message);
//       }
//     }

//     async function handleAdd() {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/admins`, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(newAdmin),
//         });
//         if (!res.ok) throw new Error('שגיאה בהוספת מנהל');
//         setNewAdmin(emptyAdmin);
//         fetchAdmins();
//       } catch (e) {
//         alert('אירעה שגיאה: ' + e.message);
//       }
//     }

//     async function handleUpdate() {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/admins/${editingAdmin.id}`, {
//           method: 'PUT',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(editingAdmin),
//         });
//         if (!res.ok) throw new Error('שגיאה בעדכון מנהל');
//         setEditingAdmin(null);
//         fetchAdmins();
//       } catch (e) {
//         alert('אירעה שגיאה: ' + e.message);
//       }
//     }

//     if (loading) return <Typography>טוען מנהלים...</Typography>;
//     if (error) return <Typography color="error">שגיאה: {error}</Typography>;

//     return (
//       <Box dir="rtl" sx={{ mt: 3 }}>
//         <Typography variant="h5" gutterBottom>
//           רשימת מנהלים
//         </Typography>

//         <Grid container spacing={3}>
//           {admins.map(admin => (
//             <Grid item xs={12} sm={6} md={4} key={admin.id}>
//               <Card sx={{ height: '100%' }}>
//                 <CardContent>
//                   <Typography variant="h6" gutterBottom>
//                     מנהל
//                   </Typography>
//                   <Divider sx={{ mb: 1 }} />

//                   <Typography><strong>שם:</strong> {admin.full_name}</Typography>
//                   <Typography><strong>אימייל:</strong> {admin.email}</Typography>
//                   <Typography><strong>טלפון:</strong> {admin.phone}</Typography>

//                   <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
//                     <Button variant="contained" onClick={() => setEditingAdmin(admin)}>
//                       עדכון
//                     </Button>
//                     <Button variant="outlined" color="error" onClick={() => handleDelete(admin.id)}>
//                       מחיקה
//                     </Button>
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Box dir="rtl" sx={{ mt: 4 }}>
//           <Typography variant="h6" gutterBottom>
//             הוספת מנהל חדש
//           </Typography>
//           <Stack spacing={2} maxWidth={400}>
//             <TextField
//               label="שם מלא"
//               value={newAdmin.full_name}
//               onChange={e => setNewAdmin({ ...newAdmin, full_name: e.target.value })}
//             />
//             <TextField
//               label="אימייל"
//               value={newAdmin.email}
//               onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })}
//             />
//             <TextField
//               label="סיסמה"
//               type="password"
//               value={newAdmin.password}
//               onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })}
//             />
//             <TextField
//               label="טלפון"
//               value={newAdmin.phone}
//               onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })}
//             />
//             <Button variant="contained" onClick={handleAdd}>
//               הוסף מנהל
//             </Button>
//           </Stack>
//         </Box>

//         {editingAdmin && (
//           <Box dir="rtl" sx={{ mt: 4 }}>
//             <Typography variant="h6" gutterBottom>
//               עדכון מנהל
//             </Typography>
//             <Stack spacing={2} maxWidth={400}>
//               <TextField
//                 label="שם מלא"
//                 value={editingAdmin.full_name}
//                 onChange={e => setEditingAdmin({ ...editingAdmin, full_name: e.target.value })}
//               />
//               <TextField
//                 label="אימייל"
//                 value={editingAdmin.email}
//                 onChange={e => setEditingAdmin({ ...editingAdmin, email: e.target.value })}
//               />
//               <TextField
//                 label="סיסמה"
//                 type="password"
//                 value={editingAdmin.password}
//                 onChange={e => setEditingAdmin({ ...editingAdmin, password: e.target.value })}
//               />
//               <TextField
//                 label="טלפון"
//                 value={editingAdmin.phone}
//                 onChange={e => setEditingAdmin({ ...editingAdmin, phone: e.target.value })}
//               />
//               <Stack direction="row" spacing={2}>
//                 <Button variant="contained" onClick={handleUpdate}>
//                   שמור
//                 </Button>
//                 <Button variant="outlined" onClick={() => setEditingAdmin(null)}>
//                   ביטול
//                 </Button>
//               </Stack>
//             </Stack>
//           </Box>
//         )}
//       </Box>
//     );
//   } 

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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function AdminsList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const emptyAdmin = {
    full_name: '',
    email: '',
    password: '',
    phone: ''
  };

  const [newAdmin, setNewAdmin] = useState(emptyAdmin);
  const [editingAdmin, setEditingAdmin] = useState(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  async function fetchAdmins() {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3001/api/admins`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('שגיאה בטעינת המנהלים');

      const data = await res.json();
      setAdmins(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3001/api/admins/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('שגיאה במחיקת המנהל');

      setAdmins(prev => prev.filter(a => a.id !== id));
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleAdd() {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3001/api/admins`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAdmin),
      });

      if (!res.ok) throw new Error('שגיאה בהוספת מנהל');

      setNewAdmin(emptyAdmin);
      setOpenAdd(false);
      fetchAdmins();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  async function handleUpdate() {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3001/api/admins/${editingAdmin.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editingAdmin),
      });

      if (!res.ok) throw new Error('שגיאה בעדכון מנהל');

      setEditingAdmin(null);
      setOpenEdit(false);
      fetchAdmins();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  if (loading) return <Typography>טוען מנהלים...</Typography>;
  if (error) return <Typography color="error">שגיאה: {error}</Typography>;

  return (
    <Box dir="rtl" sx={{ mt: 3 }}>

      <Stack direction="row" alignItems="center" spacing={1}>
        <Typography variant="h5">רשימת מנהלים</Typography>

        <IconButton color="primary" onClick={() => setOpenAdd(true)}>
          <AddIcon />
        </IconButton>
      </Stack>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {admins.map(admin => (
          <Grid item xs={12} sm={6} md={4} key={admin.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>

                <Typography variant="h6" gutterBottom>
                  מנהל
                </Typography>

                <Divider sx={{ mb: 1 }} />

                <Typography><strong>שם:</strong> {admin.full_name}</Typography>
                <Typography><strong>אימייל:</strong> {admin.email}</Typography>
                <Typography><strong>טלפון:</strong> {admin.phone}</Typography>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      setEditingAdmin(admin);
                      setOpenEdit(true);
                    }}
                  >
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    color="error"
                    onClick={() => handleDelete(admin.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Stack>

              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>


      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} dir="rtl">
        <DialogTitle>הוספת מנהל</DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>

            <TextField
              label="שם מלא"
              value={newAdmin.full_name}
              onChange={e =>
                setNewAdmin({ ...newAdmin, full_name: e.target.value })
              }
            />

            <TextField
              label="אימייל"
              value={newAdmin.email}
              onChange={e =>
                setNewAdmin({ ...newAdmin, email: e.target.value })
              }
            />

            <TextField
              label="סיסמה"
              type="password"
              value={newAdmin.password}
              onChange={e =>
                setNewAdmin({ ...newAdmin, password: e.target.value })
              }
            />

            <TextField
              label="טלפון"
              value={newAdmin.phone}
              onChange={e =>
                setNewAdmin({ ...newAdmin, phone: e.target.value })
              }
            />

          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>ביטול</Button>
          <Button variant="contained" onClick={handleAdd}>
            הוסף
          </Button>
        </DialogActions>
      </Dialog>


      <Dialog open={openEdit} onClose={() => setOpenEdit(false)} dir="rtl">

        <DialogTitle>עדכון מנהל</DialogTitle>

        <DialogContent>

          {editingAdmin && (

            <Stack spacing={2} sx={{ mt: 1, minWidth: 300 }}>

              <TextField
                label="שם מלא"
                value={editingAdmin.full_name}
                onChange={e =>
                  setEditingAdmin({
                    ...editingAdmin,
                    full_name: e.target.value
                  })
                }
              />

              <TextField
                label="אימייל"
                value={editingAdmin.email}
                onChange={e =>
                  setEditingAdmin({
                    ...editingAdmin,
                    email: e.target.value
                  })
                }
              />

              <TextField
                label="סיסמה"
                type="password"
                value={editingAdmin.password}
                onChange={e =>
                  setEditingAdmin({
                    ...editingAdmin,
                    password: e.target.value
                  })
                }
              />

              <TextField
                label="טלפון"
                value={editingAdmin.phone}
                onChange={e =>
                  setEditingAdmin({
                    ...editingAdmin,
                    phone: e.target.value
                  })
                }
              />

            </Stack>

          )}

        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>
            ביטול
          </Button>

          <Button variant="contained" onClick={handleUpdate}>
            שמור
          </Button>
        </DialogActions>

      </Dialog>

    </Box>
  );
}