import React, { useContext, useEffect, useState } from 'react';
import EventOrdersList from './EventOrdersList';
import ServiceTypeSelector from './ServiceTypeSelector';
import ProviderListByServiceType from './ProviderListByServiceType';
import { EventContext } from '../context/eventContext';

export default function CurrentEventPage() {

  const { selectedEvent } = useContext(EventContext);
  const [fullEvent, setFullEvent] = useState(selectedEvent);
  const [error, setError] = useState('');
  const [showOrders, setShowOrders] = useState(false);
  const [showServiceSelector, setShowServiceSelector] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/events/with-clients/${selectedEvent.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('שגיאה בקבלת פרטי האירוע');
        const data = await res.json();
        setFullEvent(data);
      } catch (err) {
        setError(err.message || 'שגיאה כללית');
      }
    };

    if (selectedEvent?.id) {
      fetchEvent();
    }
  }, [selectedEvent]);

  const handleToggleBooking = () => {
    if (showServiceSelector) {
      // סגור הכל
      setShowServiceSelector(false);
      setSelectedServiceType(null);
    } else {
      // פתח
      setShowServiceSelector(true);
    }
  };

  const handleServiceSelect = (serviceTypeId) => {
    setSelectedServiceType(serviceTypeId);
  };

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!fullEvent) return <p>טוען פרטי אירוע...</p>;

  return (
    <div>
      <h2>פרטי האירוע</h2>
      <p><strong>סוג:</strong> {fullEvent.event_type_name}</p>
      <p><strong>תאריך:</strong> {fullEvent.event_date}</p>
      <p><strong>מחיר:</strong> {fullEvent.price} ₪</p>
      <p><strong>לקוח ראשי:</strong> {fullEvent.client1_name}</p>
      <p><strong>לקוח משני:</strong> {fullEvent.client2_name || '—'}</p>

      <button className="button" onClick={handleToggleBooking}>
        {showServiceSelector ? 'ביטול הוספת הזמנה' : 'הוספת הזמנה לאירוע'}
      </button>

      {showServiceSelector && (
        <div style={{ marginTop: '1rem' }}>
          <ServiceTypeSelector
            selectedId={selectedServiceType}
            onSelect={handleServiceSelect}
          />
        </div>
      )}

      {showServiceSelector && selectedServiceType && (
        <ProviderListByServiceType
          serviceTypeId={selectedServiceType}
          eventId={fullEvent.id}
          clientId={fullEvent.client1_id}
          eventDate={fullEvent.event_date}
        />
      )}

      <button
        className="button"
        style={{ marginRight: '1rem', marginTop: '1rem' }}
        onClick={() => setShowOrders(!showOrders)}
      >
        {showOrders ? 'הסתר הזמנות' : 'צפייה בהזמנות'}
      </button>

      {showOrders && <EventOrdersList eventId={selectedEvent.id} />}
    </div>
  );
}

