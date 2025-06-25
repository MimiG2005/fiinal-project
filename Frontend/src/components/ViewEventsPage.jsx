import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../context/userContext';
import { EventContext } from '../context/eventContext';
import { useNavigate } from 'react-router-dom';

export default function ViewEventsPage() {

  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);
  const { setSelectedEvent } = useContext(EventContext);
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (currentUser === null) return
    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/events/client/${currentUser.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
        setEvents(await res.json());
      } catch (err) {
        setError(err.message || 'שגיאה כללית');
      }
    };
    fetchEvents();
  }, [currentUser]);

  const isFutureDate = dateStr => dateStr >= new Date().toISOString().split('T')[0];

  return (
    <div>
      <h2>רשימת האירועים שלך</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {events.length === 0 ? (
        <p>אין אירועים להצגה</p>
      ) : (
        <ul>
          {events.map(evt => (
            <li key={evt.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
              <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}<br />
              <strong>תאריך:</strong> {evt.event_date}<br />
              <strong>מחיר:</strong> {evt.price} ₪<br />
              {isFutureDate(evt.event_date) ? (
                <button className="button" onClick={() => {
                  setSelectedEvent(evt);
                  navigate(`/${currentUser.id}/home/current`)
                }}>
                  עדכן אירוע
                </button>
              ) : (
                <button className="button" disabled style={{ backgroundColor: '#ccc' }}>
                  אירוע עבר
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
