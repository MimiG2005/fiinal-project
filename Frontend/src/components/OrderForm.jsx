// import React, { useState } from 'react';

// export default function OrderForm({ provider, eventId, clientId, eventDate, onClose }) {
//   const [time, setTime] = useState('');
//   const [location, setLocation] = useState('');
//   const [notes, setNotes] = useState('');
//   const [message, setMessage] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // בדיקה שכל שדות החובה קיימים
//     if (!time || !location) {
//       setMessage('אנא מלאי את כל השדות הנדרשים');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       const formattedDate = new Date(eventDate).toISOString().split('T')[0]; // YYYY-MM-DD
//       const formattedTime = time.length === 5 ? time + ':00' : time; // HH:MM:SS

//       const body = {
//         event_id: eventId,
//         client_id: clientId,
//         provider_id: provider.provider_id,
//         order_date: formattedDate,
//         order_time: formattedTime,
//         total_price: provider.price,
//         location,
//         status_id: 2,
//         notes,
//       };

//       console.log('Sending order:', body);

//       const res = await fetch('http://localhost:3001/api/orders', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(body),
//       });

//       if (!res.ok) throw new Error('שגיאה ביצירת ההזמנה');

//       setMessage('ההזמנה נשלחה בהצלחה!');
//       onClose();
//     } catch (err) {
//       console.error('שגיאה:', err);
//       setMessage('אירעה שגיאה בשליחת ההזמנה');
//     }
//   };

//   return (
//     <div style={{ marginTop: '1rem', padding: '1rem', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: '#f1f9ff' }}>
//       <h4>הזמנת ספק: {provider.full_name}</h4>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>שעה:</label>
//           <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
//         </div>
//         <div>
//           <label>מיקום:</label>
//           <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
//         </div>
//         <div>
//           <label>הערות:</label>
//           <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
//         </div>
//         <button type="submit">שלח הזמנה</button>
//         <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>ביטול</button>
//       </form>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

export default function OrderForm({ provider, eventId, clientId, eventDate, onClose }) {
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [areas, setAreas] = useState([]);

  // טוען את רשימת המיקומים מהשרת
  useEffect(() => {
    const fetchAreas = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/api/areas', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('שגיאה בטעינת מיקומים');
        const data = await res.json();
        setAreas(data);
      } catch (err) {
        console.error('שגיאה בטעינת אזורים:', err);
      }
    };

    fetchAreas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!time || !location) {
      setMessage('אנא מלאי את כל השדות הנדרשים');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const formattedDate = new Date(eventDate).toISOString().split('T')[0];
      const formattedTime = time.length === 5 ? time + ':00' : time;

      const body = {
        event_id: eventId,
        client_id: clientId,
        provider_id: provider.provider_id,
        order_date: formattedDate,
        order_time: formattedTime,
        total_price: provider.price,
        location,
        status_id: 2,
        notes,
      };

      const res = await fetch('http://localhost:3001/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error('שגיאה ביצירת ההזמנה');

      setMessage('ההזמנה נשלחה בהצלחה!');
      onClose();
    } catch (err) {
      console.error('שגיאה:', err);
      setMessage('אירעה שגיאה בשליחת ההזמנה');
    }
  };

  return (
    <div style={{ marginTop: '1rem', padding: '1rem', border: '2px solid #007bff', borderRadius: '8px', backgroundColor: '#f1f9ff' }}>
      <h4>הזמנת ספק: {provider.full_name}</h4>
      <form onSubmit={handleSubmit}>
        <div>
          <label>שעה:</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        </div>
        <div>
          <label>מיקום:</label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="">בחרי מיקום</option>
            {areas.map(area => (
              <option key={area.id} value={area.name}>
                {area.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>הערות:</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
        </div>
        <button type="submit">שלח הזמנה</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>ביטול</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

