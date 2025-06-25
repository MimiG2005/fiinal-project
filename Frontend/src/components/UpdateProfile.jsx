import React, { useEffect, useState } from 'react';
import '../styles/providers/UpdateProfile.css';

export default function UpdateProfile({ providerId }) {
  const [providerData, setProviderData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    async function fetchProviderData() {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/providers/${providerId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!res.ok) throw new Error('שגיאה בטעינת פרטי הספק');
        const data = await res.json();
        setProviderData(data);
      } catch (e) {
        setMessage('אירעה שגיאה: ' + e.message);
      } finally {
        setLoading(false);
      }
    }

    if (providerId) fetchProviderData();
  }, [providerId]);

  const handleChange = (e) => {
    setProviderData({
      ...providerData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/providers/${providerId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(providerData)
      });

      if (!res.ok) throw new Error('שגיאה בשמירת הנתונים');
      setMessage('✔️ הפרטים עודכנו בהצלחה');
    } catch (e) {
      setMessage('❌ אירעה שגיאה: ' + e.message);
    }
  };

  if (loading) return <div className="update-profile-container">טוען פרטי ספק...</div>;

  return (
    <div className="update-profile-container">
      <h3>עדכון פרטים אישיים</h3>
      <div className="form-group">
        <label>שם מלא:</label>
        <input type="text" name="full_name" value={providerData.full_name} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>אימייל:</label>
        <input type="email" name="email" value={providerData.email} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>טלפון:</label>
        <input type="text" name="phone" value={providerData.phone} onChange={handleChange} />
      </div>

      <div className="form-group">
        <label>כתובת:</label>
        <input type="text" name="address" value={providerData.address} onChange={handleChange} />
      </div>

      <button className="save-button" onClick={handleSave}>שמור</button>

      {message && <p className="status-message">{message}</p>}
    </div>
  );
}
