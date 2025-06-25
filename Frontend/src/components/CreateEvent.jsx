
import React, { useState, useEffect, useContext } from 'react';
import { CreateEvent } from '../services/event';
import '../styles/Login.css';
import { userContext } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);
  const [event, setEvent] = useState({

    client2_id: '',
    event_type_id: '',
    event_date: '',
    price: '',
  });

  const [eventTypes, setEventTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // שליפת סוגי אירועים כמו fetchProviders
  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:3001/api/events/event-types', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error('שגיאה בקבלת סוגי האירועים');
        }
        const data = await res.json();
        setEventTypes(data);
      } catch (error) {
        console.error('שגיאה בטעינת סוגי אירועים:', error);
      }
    };

    fetchEventTypes();
  }, []);

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      event['client1_id'] = currentUser.id;
      const result = await CreateEvent(event);
      if (result) {
        alert('האירוע נוצר בהצלחה!');
        // if (onEventCreated) {
          navigate(`/${currentUser.id}/home/view`);
        // }; // מעביר ל-tab אחר
      } else {
        setErrorMessage('אירעה שגיאה ביצירת האירוע.');
      }
    } catch (err) {
      setErrorMessage('שגיאה כללית. ייתכן שחסרים שדות.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">יצירת אירוע</h2>

        <label className="label">מזהה שותף (אופציונלי)</label>
        <input
          className="input"
          name="client2_id"
          value={event.client2_id}
          onChange={handleChange}
        />

        <label className="label">סוג אירוע</label>
        <select
          className="input"
          name="event_type_id"
          value={event.event_type_id}
          onChange={handleChange}
          required
        >
          <option value="">בחר סוג אירוע</option>
          {eventTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>

        <label className="label">תאריך האירוע</label>
        <input
          className="input"
          name="event_date"
          type="date"
          value={event.event_date}
          onChange={handleChange}
          required
        />

        <label className="label">מחיר</label>
        <input
          className="input"
          name="price"
          type="number"
          value={event.price}
          onChange={handleChange}
        />

        <button type="submit" className="button">שמור אירוע</button>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
