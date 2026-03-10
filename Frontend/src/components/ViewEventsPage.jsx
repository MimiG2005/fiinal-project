// // // import React, { useContext, useEffect, useState } from 'react';
// // // import { userContext } from '../context/userContext';
// // // import { EventContext } from '../context/eventContext';
// // // import { useNavigate, useParams } from 'react-router-dom';
// // // import { use } from 'react';
// // // import { useCallback } from 'react';

// // // export default function ViewEventsPage() {

// // //   const navigate = useNavigate();
// // //   const { currentUser } = useContext(userContext);
// // //   const { id } = useParams();
// // //   const { setSelectedEvent } = useContext(EventContext);
// // //   const [events, setEvents] = useState([]);
// // //   const [error, setError] = useState('');

// // //   const fetchEvents = useCallback(async () => {
// // //     try {
// // //       const token = localStorage.getItem('token');
// // //       const res = await fetch(`http://localhost:3001/api/events/client/${id}`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
// // //       setEvents(await res.json());
// // //     } catch (err) {
// // //       setError(err.message || 'שגיאה כללית');
// // //     }
// // //   }, [currentUser]);

// // //   useEffect(() => {
// // //     if (currentUser) {
// // //       fetchEvents();
// // //     }

// // //   }, [currentUser]);

// // //   const isFutureDate = dateStr => dateStr >= new Date().toISOString().split('T')[0];

// // //   return (
// // //     <div>
// // //       <h2>רשימת האירועים שלך</h2>
// // //       {error && <p style={{ color: 'red' }}>{error}</p>}
// // //       {events.length === 0 ? (
// // //         <p>אין אירועים להצגה</p>
// // //       ) : (
// // //         <ul>
// // //           {events.map(evt => (
// // //             <li key={evt.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
// // //               <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}<br />
// // //               <strong>תאריך:</strong> {evt.event_date}<br />
// // //               <strong>מחיר:</strong> {evt.price} ₪<br />
// // //               {isFutureDate(evt.event_date) ? (
// // //                 <button className="button" onClick={() => {
// // //                   setSelectedEvent(evt);
// // //                   navigate(`/${currentUser.id}/home/current`)
// // //                 }}>
// // //                   עדכן אירוע
// // //                 </button>
// // //               ) : (
// // //                 <button className="button" disabled style={{ backgroundColor: '#ccc' }}>
// // //                   אירוע עבר
// // //                 </button>
// // //               )}
// // //             </li>
// // //           ))}
// // //         </ul>
// // //       )}
// // //     </div>
// // //   );
// // // }


// // import React, { useContext, useEffect, useState, useCallback } from 'react';
// // import { userContext } from '../context/userContext';
// // import { EventContext } from '../context/eventContext';
// // import { useNavigate, useParams } from 'react-router-dom';

// // // MUI imports
// // import { Box, Typography, Card, CardContent, Button, Alert, Stack } from '@mui/material';

// // export default function ViewEventsPage() {
// //   const navigate = useNavigate();
// //   const { currentUser } = useContext(userContext);
// //   const { id } = useParams();
// //   const { setSelectedEvent } = useContext(EventContext);
// //   const [events, setEvents] = useState([]);
// //   const [error, setError] = useState('');

// //   const fetchEvents = useCallback(async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const res = await fetch(`http://localhost:3001/api/events/client/${id}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
// //       setEvents(await res.json());
// //     } catch (err) {
// //       setError(err.message || 'שגיאה כללית');
// //     }
// //   }, [id]);

// //   useEffect(() => {
// //     if (currentUser) {
// //       fetchEvents();
// //     }
// //   }, [currentUser, fetchEvents]);

// //   const isFutureDate = (dateStr) => dateStr >= new Date().toISOString().split('T')[0];

// //   return (
// //     <Box sx={{ p: 3 }}>
// //       <Typography variant="h5" mb={2}>רשימת האירועים שלך</Typography>

// //       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

// //       {events.length === 0 ? (
// //         <Typography>אין אירועים להצגה</Typography>
// //       ) : (
// //         <Stack spacing={2}>
// //           {events.map((evt) => (
// //             <Card key={evt.id} variant="outlined">
// //               <CardContent>
// //                 <Typography><strong>סוג אירוע:</strong> {evt.event_type_name || '—'}</Typography>
// //                 <Typography><strong>תאריך:</strong> {evt.event_date}</Typography>
// //                 <Typography><strong>מחיר:</strong> {evt.price} ₪</Typography>

// //                 {isFutureDate(evt.event_date) ? (
// //                   <Button
// //                     variant="contained"
// //                     color="primary"
// //                     sx={{ mt: 1 }}
// //                     onClick={() => {
// //                       setSelectedEvent(evt);
// //                       navigate(`/${currentUser.id}/home/current`);
// //                     }}
// //                   >
// //                     עדכן אירוע
// //                   </Button>
// //                 ) : (
// //                   <Button variant="contained" disabled sx={{ mt: 1 }}>
// //                     אירוע עבר
// //                   </Button>
// //                 )}
// //               </CardContent>
// //             </Card>
// //           ))}
// //         </Stack>
// //       )}
// //     </Box>
// //   );
// // }
// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import { userContext } from '../context/userContext';
// import { EventContext } from '../context/eventContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Box, Typography, Card, CardContent, Button, Alert, Grid, Stack } from '@mui/material';

// export default function ViewEventsPage() {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(userContext);
//   const { id } = useParams();
//   const { setSelectedEvent } = useContext(EventContext);

//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState('');
//   const [showFuture, setShowFuture] = useState(true); // טאב לעבר/עתיד

//   const fetchEvents = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/events/client/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
//       setEvents(await res.json());
//     } catch (err) {
//       setError(err.message || 'שגיאה כללית');
//     }
//   }, [id]);

//   useEffect(() => {
//     if (currentUser) fetchEvents();
//   }, [currentUser, fetchEvents]);

//   const isFutureDate = (dateStr) => dateStr >= new Date().toISOString().split('T')[0];

//   // סינון לפי עבר / עתיד
//   const filteredEvents = events.filter(evt =>
//     showFuture ? isFutureDate(evt.event_date) : !isFutureDate(evt.event_date)
//   );

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—';
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('he-IL');
//   };

//   return (
//     <Box   dir="rtl" sx={{ p: 3 }}>
//       <Typography variant="h5" mb={2}>רשימת האירועים שלך</Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//       {/* כפתורים לעבור בין עבר/עתיד */}
//       <Stack direction="row" spacing={2} mb={3}>
//         <Button
//           variant={showFuture ? "contained" : "outlined"}
//           onClick={() => setShowFuture(true)}
//         >
//           אירועים עתידיים
//         </Button>
//         <Button
//           variant={!showFuture ? "contained" : "outlined"}
//           onClick={() => setShowFuture(false)}
//         >
//           אירועים עברו
//         </Button>
//       </Stack>

//       {filteredEvents.length === 0 ? (
//         <Typography>אין אירועים להצגה</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {filteredEvents.map((evt) => (
//             <Grid item xs={12} sm={6} md={3} key={evt.id}> {/* 4 כרטיסים בשורה */}
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="subtitle1">
//                     <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>תאריך:</strong> {formatDate(evt.event_date)}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>מחיר:</strong> {evt.price} ₪
//                   </Typography>

//                   <Stack mt={2}>
//                     {isFutureDate(evt.event_date) ? (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => {
//                           setSelectedEvent(evt);
//                           navigate(`/${currentUser.id}/home/current`);
//                         }}
//                       >
//                         עדכן אירוע
//                       </Button>
//                     ) : (
//                       <Button variant="contained" disabled>
//                         אירוע עבר
//                       </Button>
//                     )}
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }



// import React, { useContext, useEffect, useState, useCallback } from 'react';
// import { userContext } from '../context/userContext';
// import { EventContext } from '../context/eventContext';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Box, Typography, Card, CardContent, Button, Alert, Grid, Stack } from '@mui/material';

// export default function ViewEventsPage() {
//   const navigate = useNavigate();
//   const { currentUser } = useContext(userContext);
//   const { id } = useParams();
//   const { setSelectedEvent } = useContext(EventContext);

//   const [events, setEvents] = useState([]);
//   const [error, setError] = useState('');
//   const [showFuture, setShowFuture] = useState(true); // טאב לעבר/עתיד

//   const fetchEvents = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const res = await fetch(`http://localhost:3001/api/events/client/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
//       setEvents(await res.json());
//     } catch (err) {
//       setError(err.message || 'שגיאה כללית');
//     }
//   }, [id]);

//   useEffect(() => {
//     if (currentUser) fetchEvents();
//   }, [currentUser, fetchEvents]);

//   const isFutureDate = (dateStr) => dateStr >= new Date().toISOString().split('T')[0];

//   // סינון לפי עבר / עתיד
//   const filteredEvents = events.filter(evt =>
//     showFuture ? isFutureDate(evt.event_date) : !isFutureDate(evt.event_date)
//   );

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '—';
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('he-IL');
//   };

//   return (
//     <Box dir="rtl" sx={{ p: 3 }}>
//       <Typography variant="h5" mb={2}>רשימת האירועים שלך</Typography>

//       {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

//       {/* כפתורים לעבור בין עבר/עתיד */}
//       <Stack direction="row" spacing={2} mb={3}>
//         <Button
//           variant={showFuture ? "contained" : "outlined"}
//           onClick={() => setShowFuture(true)}
//         >
//           אירועים עתידיים
//         </Button>
//         <Button
//           variant={!showFuture ? "contained" : "outlined"}
//           onClick={() => setShowFuture(false)}
//         >
//           אירועים עברו
//         </Button>
//       </Stack>

//       {filteredEvents.length === 0 ? (
//         <Typography>אין אירועים להצגה</Typography>
//       ) : (
//         <Grid container spacing={2}>
//           {filteredEvents.map((evt) => (
//             <Grid item xs={12} sm={6} md={3} key={evt.id}>
//               <Card variant="outlined">
//                 <CardContent>
//                   <Typography variant="subtitle1">
//                     <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>תאריך:</strong> {formatDate(evt.event_date)}
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>מחיר:</strong> {evt.price} ₪
//                   </Typography>

//                   <Stack mt={2} spacing={1}>
//                     {isFutureDate(evt.event_date) ? (
//                       <Button
//                         variant="contained"
//                         color="primary"
//                         onClick={() => {
//                           setSelectedEvent(evt);
//                           navigate(`/${currentUser.id}/home/current`);
//                         }}
//                       >
//                         עדכן אירוע
//                       </Button>
//                     ) : (
//                       <>
//                         <Button variant="contained" disabled>
//                           אירוע עבר
//                         </Button>

//                         {/* כפתור דרג ספקים לאירועים עברו
//                         <Button
//                           variant="contained"
//                           color="secondary"
//                           onClick={() => navigate(`/providers/${evt.id}/providers`)}
//                         >
//                           דרג ספקים
//                         </Button>
//                       </> */}

//                            <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={() =>
//                   setEvents(prev =>
//                     prev.map(e =>
//                       e.id === evt.id ? { ...e, showProviders: !e.showProviders } : e
//                     )
//                   )
//                 }
//               >
//                 דרג ספקים
//               </Button>

//               {/* הצגת קומפוננטת ספקים */}
//               {evt.showProviders && <EventProviders eventId={evt.id} />}
//             </>
//                     )}
//                   </Stack>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Box>
//   );
// }


import React, { useContext, useEffect, useState, useCallback } from 'react';
import { userContext } from '../context/userContext';
import { EventContext } from '../context/eventContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Button, Alert, Grid, Stack } from '@mui/material';
// import EventProviders from '../components/EventProviders'; // <-- ייבוא הקומפוננטה

export default function ViewEventsPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);
  const { id } = useParams();
  const { setSelectedEvent } = useContext(EventContext);

  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [showFuture, setShowFuture] = useState(true); // טאב לעבר/עתיד

  const fetchEvents = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:3001/api/events/client/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error('שגיאה בקבלת האירועים');
      setEvents(await res.json());
    } catch (err) {
      setError(err.message || 'שגיאה כללית');
    }
  }, [id]);

  useEffect(() => {
    if (currentUser) fetchEvents();
  }, [currentUser, fetchEvents]);

  const isFutureDate = (dateStr) => dateStr >= new Date().toISOString().split('T')[0];

  const filteredEvents = events.filter(evt =>
    showFuture ? isFutureDate(evt.event_date) : !isFutureDate(evt.event_date)
  );

  const formatDate = (dateStr) => {
    if (!dateStr) return '—';
    const date = new Date(dateStr);
    return date.toLocaleDateString('he-IL');
  };

  return (
    <Box dir="rtl" sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>רשימת האירועים שלך</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {/* כפתורים לעבור בין עבר/עתיד */}
      <Stack direction="row" spacing={2} mb={3}>
        <Button
          variant={showFuture ? "contained" : "outlined"}
          onClick={() => setShowFuture(true)}
        >
          אירועים עתידיים
        </Button>
        <Button
          variant={!showFuture ? "contained" : "outlined"}
          onClick={() => setShowFuture(false)}
        >
          אירועים עברו
        </Button>
      </Stack>

      {filteredEvents.length === 0 ? (
        <Typography>אין אירועים להצגה</Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredEvents.map((evt) => (
            <Grid item xs={12} sm={6} md={3} key={evt.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="subtitle1">
                    <strong>סוג אירוע:</strong> {evt.event_type_name || '—'}
                  </Typography>
                  <Typography variant="body2">
                    <strong>תאריך:</strong> {formatDate(evt.event_date)}
                  </Typography>
                  <Typography variant="body2">
                    <strong>מחיר:</strong> {evt.price} ₪
                  </Typography>

                  <Stack mt={2} spacing={1}>
                    {isFutureDate(evt.event_date) ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          setSelectedEvent(evt);
                          navigate(`/${currentUser.id}/home/current`);
                        }}
                      >
                        עדכן אירוע
                      </Button>
                    ) : (
                      <>
                        <Button variant="contained" disabled>
                          אירוע עבר
                        </Button>

                      

                        {/* הצגת קומפוננטת ספקים */}
                        {evt.showProviders && <EventProviders eventId={evt.id} />}
                      </>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}