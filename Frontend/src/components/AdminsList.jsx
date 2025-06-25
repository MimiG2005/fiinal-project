import React, { useEffect, useState } from 'react';

export default function AdminsList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      fetchAdmins();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  if (loading) return <div>טוען מנהלים...</div>;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <div>
      <h3>רשימת מנהלים</h3>
      <ul>
        {admins.map(admin => (
          <li key={admin.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
            <div><strong>שם:</strong> {admin.full_name}</div>
            <div><strong>אימייל:</strong> {admin.email}</div>
            <div><strong>טלפון:</strong> {admin.phone}</div>
            <button onClick={() => setEditingAdmin(admin)} style={{ marginInlineEnd: 8 }}>עדכון</button>
            <button onClick={() => handleDelete(admin.id)}>מחיקה</button>
          </li>
        ))}
      </ul>

      <h4>הוספת מנהל חדש</h4>
      <input placeholder="שם מלא" value={newAdmin.full_name} onChange={e => setNewAdmin({ ...newAdmin, full_name: e.target.value })} />
      <input placeholder="אימייל" value={newAdmin.email} onChange={e => setNewAdmin({ ...newAdmin, email: e.target.value })} />
      <input placeholder="סיסמה" type="password" value={newAdmin.password} onChange={e => setNewAdmin({ ...newAdmin, password: e.target.value })} />
      <input placeholder="טלפון" value={newAdmin.phone} onChange={e => setNewAdmin({ ...newAdmin, phone: e.target.value })} />
      <button onClick={handleAdd}>הוסף</button>

      {editingAdmin && (
        <div style={{ marginTop: 20 }}>
          <h4>עדכון מנהל</h4>
          <input value={editingAdmin.full_name} onChange={e => setEditingAdmin({ ...editingAdmin, full_name: e.target.value })} />
          <input value={editingAdmin.email} onChange={e => setEditingAdmin({ ...editingAdmin, email: e.target.value })} />
          <input type="password" value={editingAdmin.password} onChange={e => setEditingAdmin({ ...editingAdmin, password: e.target.value })} />
          <input value={editingAdmin.phone} onChange={e => setEditingAdmin({ ...editingAdmin, phone: e.target.value })} />
          <button onClick={handleUpdate}>שמור</button>
          <button onClick={() => setEditingAdmin(null)}>ביטול</button>
        </div>
      )}
    </div>
  );
}
