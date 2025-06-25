import React, { useEffect, useState } from 'react';

export default function ServiceTypeSelector({ selectedId, onSelect }) {
  const [serviceTypes, setServiceTypes] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServiceTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/api/service-types', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch service types');
        const data = await res.json();
        setServiceTypes(data || []);
      } catch (err) {
        console.error('שגיאה בשליפת סוגי שירות:', err);
        setError('שגיאה בשליפת סוגי שירות');
        setServiceTypes([]);
      }
    };

    fetchServiceTypes();
  }, []);

  return (
    <div>
      <h4>בחר סוג שירות:</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <select value={selectedId || ''} onChange={(e) => onSelect(e.target.value)}>
        <option value="" disabled>
          בחר סוג
        </option>
        {(serviceTypes || []).map((type) => (
          <option key={type.id} value={type.id}>
            {type.name}
          </option>
        ))}
      </select>
    </div>
  );
}
