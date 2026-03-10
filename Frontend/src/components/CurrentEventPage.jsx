// // import React, { useContext, useEffect, useState } from 'react';
// // import EventOrdersList from './EventOrdersList';
// // import ServiceTypeSelector from './ServiceTypeSelector';
// // import ProviderListByServiceType from './ProviderListByServiceType';
// // import { EventContext } from '../context/eventContext';

// // export default function CurrentEventPage() {

// //   const { selectedEvent } = useContext(EventContext);
// //   const [fullEvent, setFullEvent] = useState(selectedEvent);
// //   const [error, setError] = useState('');
// //   const [showOrders, setShowOrders] = useState(false);
// //   const [showServiceSelector, setShowServiceSelector] = useState(false);
// //   const [selectedServiceType, setSelectedServiceType] = useState(null);

// //   useEffect(() => {
// //     const fetchEvent = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const res = await fetch(`http://localhost:3001/api/events/with-clients/${selectedEvent.id}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (!res.ok) throw new Error('שגיאה בקבלת פרטי האירוע');
// //         const data = await res.json();
// //         setFullEvent(data);
// //       } catch (err) {
// //         setError(err.message || 'שגיאה כללית');
// //       }
// //     };

// //     if (selectedEvent?.id) {
// //       fetchEvent();
// //     }
// //   }, [selectedEvent]);

// //   const handleToggleBooking = () => {
// //     if (showServiceSelector) {
// //       // סגור הכל
// //       setShowServiceSelector(false);
// //       setSelectedServiceType(null);
// //     } else {
// //       // פתח
// //       setShowServiceSelector(true);
// //     }
// //   };

// //   const handleServiceSelect = (serviceTypeId) => {
// //     setSelectedServiceType(serviceTypeId);
// //   };

// //   if (error) return <p style={{ color: 'red' }}>{error}</p>;
// //   if (!fullEvent) return <p>טוען פרטי אירוע...</p>;

// //   return (
// //     <div>
// //       <h2>פרטי האירוע</h2>
// //       <p><strong>סוג:</strong> {fullEvent.event_type_name}</p>
// //       <p><strong>תאריך:</strong> {fullEvent.event_date}</p>
// //       <p><strong>מחיר:</strong> {fullEvent.price} ₪</p>
// //       <p><strong>לקוח ראשי:</strong> {fullEvent.client1_name}</p>
// //       <p><strong>לקוח משני:</strong> {fullEvent.client2_name || '—'}</p>

// //       <button className="button" onClick={handleToggleBooking}>
// //         {showServiceSelector ? 'ביטול הוספת הזמנה' : 'הוספת הזמנה לאירוע'}
// //       </button>

// //       {showServiceSelector && (
// //         <div style={{ marginTop: '1rem' }}>
// //           <ServiceTypeSelector
// //             selectedId={selectedServiceType}
// //             onSelect={handleServiceSelect}
// //           />
// //         </div>
// //       )}

// //       {showServiceSelector && selectedServiceType && (
// //         <ProviderListByServiceType
// //           serviceTypeId={selectedServiceType}
// //           eventId={fullEvent.id}
// //           clientId={fullEvent.client1_id}
// //           eventDate={fullEvent.event_date}
// //         />
// //       )}

// //       <button
// //         className="button"
// //         style={{ marginRight: '1rem', marginTop: '1rem' }}
// //         onClick={() => setShowOrders(!showOrders)}
// //       >
// //         {showOrders ? 'הסתר הזמנות' : 'צפייה בהזמנות'}
// //       </button>

// //       {showOrders && <EventOrdersList eventId={selectedEvent.id} />}
// //     </div>
// //   );
// // }


// import React, { useContext, useEffect, useState } from 'react';
// import {
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Stack,
//   Divider,
//   Box,
// } from '@mui/material';

// import EventOrdersList from './EventOrdersList';
// import ServiceTypeSelector from './ServiceTypeSelector';
// import ProviderListByServiceType from './ProviderListByServiceType';
// import { EventContext } from '../context/eventContext';

// export default function CurrentEventPage() {
//   const { selectedEvent } = useContext(EventContext);
//   const [fullEvent, setFullEvent] = useState(selectedEvent);
//   const [error, setError] = useState('');
//   const [showOrders, setShowOrders] = useState(false);
//   const [showServiceSelector, setShowServiceSelector] = useState(false);
//   const [selectedServiceType, setSelectedServiceType] = useState(null);

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(
//           `http://localhost:3001/api/events/with-clients/${selectedEvent.id}`,
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         if (!res.ok) throw new Error('שגיאה בקבלת פרטי האירוע');
//         setFullEvent(await res.json());
//       } catch (err) {
//         setError(err.message || 'שגיאה כללית');
//       }
//     };

//     if (selectedEvent?.id) fetchEvent();
//   }, [selectedEvent]);

//   const handleToggleBooking = () => {
//     if (showServiceSelector) {
//       setShowServiceSelector(false);
//       setSelectedServiceType(null);
//     } else {
//       setShowServiceSelector(true);
//     }
//   };

//   if (error) return <Typography color="error">{error}</Typography>;
//   if (!fullEvent) return <Typography>טוען פרטי אירוע…</Typography>;

//   return (
//     <Box   dir="rtl" sx={{ maxWidth: 900, mx: 'auto' }}>
//       {/* כרטיס פרטי אירוע */}
//       <Card sx={{ mb: 3 }}>
//         <CardContent>
//           <Typography variant="h5" gutterBottom>
//             פרטי האירוע
//           </Typography>

//           <Divider sx={{ mb: 2 }} />

//           <Stack spacing={1}>
//             <Typography><strong>סוג:</strong> {fullEvent.event_type_name}</Typography>
//            <Typography>
//   <strong>תאריך:</strong>{' '}
//   {new Date(fullEvent.event_date).toLocaleDateString('he-IL')}
// </Typography>
//             <Typography><strong>מחיר:</strong> {fullEvent.price} ₪</Typography>
//             <Typography><strong>לקוח ראשי:</strong> {fullEvent.client1_name}</Typography>
//             <Typography>
//               <strong>לקוח משני:</strong> {fullEvent.client2_name || '—'}
//             </Typography>
//           </Stack>
//         </CardContent>
//       </Card>

//       {/* כפתורי פעולה */}
//       <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
//         <Button
//           variant="contained"
//           onClick={handleToggleBooking}
//         >
//           {showServiceSelector ? 'ביטול הוספת הזמנה' : 'הוספת הזמנה לאירוע'}
//         </Button>

//         <Button
//           variant="outlined"
//           onClick={() => setShowOrders(!showOrders)}
//         >
//           {showOrders ? 'הסתר הזמנות' : 'צפייה בהזמנות'}
//         </Button>
//       </Stack>

//       {/* בחירת סוג שירות */}
//       {showServiceSelector && (
//         <Card sx={{ mb: 3 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               בחירת סוג שירות
//             </Typography>

//             <ServiceTypeSelector
//               selectedId={selectedServiceType}
//               onSelect={setSelectedServiceType}
//             />
//           </CardContent>
//         </Card>
//       )}

//       {/* ספקים לפי סוג שירות */}
//       {showServiceSelector && selectedServiceType && (
//         <ProviderListByServiceType
//           serviceTypeId={selectedServiceType}
//           eventId={fullEvent.id}
//           clientId={fullEvent.client1_id}
//           eventDate={fullEvent.event_date}
//         />
//       )}

//       {/* רשימת הזמנות */}
//       {showOrders && (
//         <Card sx={{ mt: 3 }}>
//           <CardContent>
//             <Typography variant="h6" gutterBottom>
//               הזמנות לאירוע
//             </Typography>
//             <EventOrdersList eventId={selectedEvent.id} />
//           </CardContent>
//         </Card>
//       )}
//     </Box>
//   );
// }



import React, { useContext, useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
} from '@mui/material';

import EventOrdersList from './EventOrdersList';
import ServiceTypeSelector from './ServiceTypeSelector';
import ProviderListByServiceType from './ProviderListByServiceType';
import { EventContext } from '../context/eventContext';

export default function CurrentEventPage() {
  const { selectedEvent } = useContext(EventContext);
  const [fullEvent, setFullEvent] = useState(selectedEvent);
  const [error, setError] = useState('');

  // מצב פעיל: 'orders' | 'booking' | null
  const [activeSection, setActiveSection] = useState(null);
  const [selectedServiceType, setSelectedServiceType] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(
          `http://localhost:3001/api/events/with-clients/${selectedEvent.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error('שגיאה בקבלת פרטי האירוע');
        setFullEvent(await res.json());
      } catch (err) {
        setError(err.message || 'שגיאה כללית');
      }
    };

    if (selectedEvent?.id) fetchEvent();
  }, [selectedEvent]);

  /* ===== פתיחה/סגירה בסגנון טאב ===== */

  const toggleSection = (section) => {
    if (activeSection === section) {
      setActiveSection(null); // סגירה בלחיצה חוזרת
      if (section === 'booking') setSelectedServiceType(null);
    } else {
      setActiveSection(section);
      if (section !== 'booking') setSelectedServiceType(null);
    }
  };

  /* ================================= */

  if (error) return <Typography color="error">{error}</Typography>;
  if (!fullEvent) return <Typography>טוען פרטי אירוע…</Typography>;

  return (
    <Box dir="rtl" sx={{ maxWidth: 900, mx: 'auto' }}>
      {/* פרטי אירוע */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            פרטי האירוע
          </Typography>

          <Divider sx={{ mb: 2 }} />

          <Stack spacing={1}>
            <Typography><strong>סוג:</strong> {fullEvent.event_type_name}</Typography>
            <Typography>
              <strong>תאריך:</strong>{' '}
              {new Date(fullEvent.event_date).toLocaleDateString('he-IL')}
            </Typography>
            <Typography><strong>מחיר:</strong> {fullEvent.price} ₪</Typography>
            <Typography><strong>לקוח ראשי:</strong> {fullEvent.client1_name}</Typography>
            <Typography>
              <strong>לקוח משני:</strong> {fullEvent.client2_name || '—'}
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      {/* כפתורי ניווט */}
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <Button
          variant={activeSection === 'booking' ? 'contained' : 'outlined'}
          onClick={() => toggleSection('booking')}
        >
          הוספת הזמנה לאירוע
        </Button>

        <Button
          variant={activeSection === 'orders' ? 'contained' : 'outlined'}
          onClick={() => toggleSection('orders')}
        >
          צפייה בהזמנות
        </Button>
      </Stack>

      {/* הוספת הזמנה */}
      {activeSection === 'booking' && (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                בחירת סוג שירות
              </Typography>

              <ServiceTypeSelector
                selectedId={selectedServiceType}
                onSelect={setSelectedServiceType}
              />
            </CardContent>
          </Card>

          {selectedServiceType && (
            <ProviderListByServiceType
              serviceTypeId={selectedServiceType}
              eventId={fullEvent.id}
              clientId={fullEvent.client1_id}
              eventDate={fullEvent.event_date}
            />
          )}
        </>
      )}

      {/* צפייה בהזמנות */}
      {activeSection === 'orders' && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              הזמנות לאירוע
            </Typography>
            <EventOrdersList eventId={selectedEvent.id} />
          </CardContent>
        </Card>
      )}
    </Box>
  );
}