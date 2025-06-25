import React, { useEffect, useState } from 'react';

export default function ProvidersList() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const emptyProvider = {
    full_name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    service_type: ''
  };

  const [newProvider, setNewProvider] = useState(emptyProvider);
  const [editingProvider, setEditingProvider] = useState(null);

  useEffect(() => {
    fetchProviders();
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

  async function handleDelete(id) {
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
      fetchProviders();
    } catch (e) {
      alert('אירעה שגיאה: ' + e.message);
    }
  }

  if (loading) return <div>טוען ספקים...</div>;
  if (error) return <div>שגיאה: {error}</div>;

  return (
    <div>
      <h3>רשימת ספקים</h3>
      <ul>
        {providers.map(provider => (
          <li key={provider.id} style={{ marginBottom: 12, padding: 12, border: '1px solid #ccc', borderRadius: 8 }}>
            <div><strong>שם:</strong> {provider.full_name}</div>
            <div><strong>אימייל:</strong> {provider.email}</div>
            <div><strong>טלפון:</strong> {provider.phone}</div>
            <div><strong>כתובת:</strong> {provider.address}</div>
            <div><strong>סוג שירות:</strong> {provider.service_type}</div>
            <button onClick={() => setEditingProvider(provider)} style={{ marginInlineEnd: 8 }}>עדכון</button>
            <button onClick={() => handleDelete(provider.id)}>מחיקה</button>
          </li>
        ))}
      </ul>

      <h4>הוספת ספק חדש</h4>
      <input placeholder="שם מלא" value={newProvider.full_name} onChange={e => setNewProvider({ ...newProvider, full_name: e.target.value })} />
      <input placeholder="אימייל" value={newProvider.email} onChange={e => setNewProvider({ ...newProvider, email: e.target.value })} />
      <input placeholder="סיסמה" type="password" value={newProvider.password} onChange={e => setNewProvider({ ...newProvider, password: e.target.value })} />
      <input placeholder="טלפון" value={newProvider.phone} onChange={e => setNewProvider({ ...newProvider, phone: e.target.value })} />
      <input placeholder="כתובת" value={newProvider.address} onChange={e => setNewProvider({ ...newProvider, address: e.target.value })} />
      <input placeholder="סוג שירות" value={newProvider.service_type} onChange={e => setNewProvider({ ...newProvider, service_type: e.target.value })} />
      <button onClick={handleAdd}>הוסף</button>

      {editingProvider && (
        <div style={{ marginTop: 20 }}>
          <h4>עדכון ספק</h4>
          <input value={editingProvider.full_name} onChange={e => setEditingProvider({ ...editingProvider, full_name: e.target.value })} />
          <input value={editingProvider.email} onChange={e => setEditingProvider({ ...editingProvider, email: e.target.value })} />
          <input type="password" value={editingProvider.password} onChange={e => setEditingProvider({ ...editingProvider, password: e.target.value })} />
          <input value={editingProvider.phone} onChange={e => setEditingProvider({ ...editingProvider, phone: e.target.value })} />
          <input value={editingProvider.address} onChange={e => setEditingProvider({ ...editingProvider, address: e.target.value })} />
          <input value={editingProvider.service_type} onChange={e => setEditingProvider({ ...editingProvider, service_type: e.target.value })} />
          <button onClick={handleUpdate}>שמור</button>
          <button onClick={() => setEditingProvider(null)}>ביטול</button>
        </div>
      )}
    </div>
  );
}
