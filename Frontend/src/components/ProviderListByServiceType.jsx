
// // import React, { useEffect, useState } from 'react';

// // export default function ProviderListByServiceType({ serviceTypeId }) {
// //   const [providers, setProviders] = useState([]);
// //   const [error, setError] = useState('');

// //   useEffect(() => {
// //     if (!serviceTypeId) return;

// //     const fetchProviders = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         const res = await fetch(`http://localhost:3001/api/providers/by-service-type/${serviceTypeId}`, {
// //           headers: {
// //             Authorization: `Bearer ${token}`,
// //           },
// //         });

// //         if (!res.ok) throw new Error('Failed to fetch providers');

// //         const data = await res.json();
// //         setProviders(data || []);
// //         setError('');
// //       } catch (err) {
// //         console.error('שגיאה בשליפת ספקים:', err);
// //         setError('שגיאה בשליפת ספקים מהשרת');
// //         setProviders([]);
// //       }
// //     };

// //     fetchProviders();
// //   }, [serviceTypeId]);

// //   if (!serviceTypeId) return null;

// //   return (
// //     <div style={{ marginTop: '1rem' }}>
// //       <h4>ספקים עבור סוג שירות נבחר:</h4>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       {providers.length === 0 && !error && <p>לא נמצאו ספקים.</p>}
// //       <ul>
// //         {providers.map((provider) => (
// //           <li key={provider.id} style={{ marginBottom: '0.5rem' }}>
// //             <strong>{provider.full_name}</strong> <br />
// //             <strong>טלפון:</strong> {provider.phone || 'לא צוין'} <br />
// //             <strong>אימייל:</strong> {provider.email} <br />
// //             <strong>כתובת:</strong>{provider.address || 'לא צוין'}
// //             <p><strong>מחיר:</strong>{provider.price} ₪ {provider.pricing_unit && `${provider.pricing_unit}`}</p>
// // <p><strong>אזורי שירות אפשריים:</strong> {provider.area_names || 'לא צוין'}</p>
// // <p><strong>הערות:</strong> {provider.notes || 'אין הערות'}</p>

// //           </li>
// //         ))}
// //       </ul>
// //     </div>
// //   );
// // }
// import React, { useEffect, useState } from 'react';
// import OrderForm from './OrderForm';

// export default function ProviderListByServiceType({ serviceTypeId, eventId, clientId, eventDate }) {
//   const [providers, setProviders] = useState([]);
//   const [error, setError] = useState('');
//   const [selectedProvider, setSelectedProvider] = useState(null);

//   useEffect(() => {
//     if (!serviceTypeId) return;

//     const fetchProviders = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const res = await fetch(`http://localhost:3001/api/providers/by-service-type/${serviceTypeId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         if (!res.ok) throw new Error('Failed to fetch providers');

//         const data = await res.json();
//         setProviders(data || []);
//         setError('');
//       } catch (err) {
//         console.error('שגיאה בשליפת ספקים:', err);
//         setError('שגיאה בשליפת ספקים מהשרת');
//         setProviders([]);
//       }
//     };

//     fetchProviders();
//   }, [serviceTypeId]);

//   if (!serviceTypeId) return null;

//   return (
//     <div style={{ marginTop: '1rem' }}>
//       <h4>ספקים עבור סוג שירות נבחר:</h4>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {providers.length === 0 && !error && <p>לא נמצאו ספקים.</p>}
//       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
//         {providers.map((provider) => (
//           <div key={provider.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '1rem', width: '300px' }}>
//             <strong>{provider.full_name}</strong><br />
//             <strong>טלפון:</strong> {provider.phone || 'לא צוין'}<br />
//             <strong>אימייל:</strong> {provider.email}<br />
//             <strong>כתובת:</strong> {provider.address || 'לא צוין'}<br />
//             <p><strong>מחיר:</strong> {provider.price} ₪ {provider.pricing_unit || ''}</p>
//             <p><strong>אזורי שירות:</strong> {provider.area_names || 'לא צוין'}</p>
//             <p><strong>הערות:</strong> {provider.notes || 'אין הערות'}</p>
//             <button onClick={() => setSelectedProvider(provider)}>הזמן ספק לאירוע</button>
//           </div>
//         ))}
//       </div>

//       {selectedProvider && (
//         <OrderForm
//           provider={selectedProvider}
//           eventId={eventId}
//           clientId={clientId}
//           eventDate={eventDate}
//           onClose={() => setSelectedProvider(null)}
//         />
//       )}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import OrderForm from './OrderForm';

export default function ProviderListByServiceType({ serviceTypeId, eventId, clientId, eventDate }) {
  const [providers, setProviders] = useState([]);
  const [error, setError] = useState('');
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    if (!serviceTypeId) return;

    const fetchProviders = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`http://localhost:3001/api/providers/by-service-type/${serviceTypeId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error('Failed to fetch providers');

        const data = await res.json();
        setProviders(data || []);
        setError('');
      } catch (err) {
        console.error('שגיאה בשליפת ספקים:', err);
        setError('שגיאה בשליפת ספקים מהשרת');
        setProviders([]);
      }
    };

    fetchProviders();
  }, [serviceTypeId]);

  if (!serviceTypeId) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      <h4>ספקים עבור סוג שירות נבחר:</h4>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {providers.length === 0 && !error && <p>לא נמצאו ספקים.</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {providers.map((provider) => (
          <div
            key={provider.id ?? `${provider.full_name}-${provider.email}`}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              padding: '1rem',
              width: '300px',
              backgroundColor: '#f9f9f9',
            }}
          >
            <strong>{provider.full_name}</strong><br />
            <strong>טלפון:</strong> {provider.phone || 'לא צוין'}<br />
            <strong>אימייל:</strong> {provider.email}<br />
            <strong>כתובת:</strong> {provider.address || 'לא צוין'}<br />
            <p><strong>מחיר:</strong> {provider.price} ₪ {provider.pricing_unit || ''}</p>
            <p>
              <strong>אזורי שירות:</strong>{' '}
              {Array.isArray(provider.area_names)
                ? provider.area_names.map((area, i) => (
                    <span key={i}>{area}{i < provider.area_names.length - 1 ? ', ' : ''}</span>
                  ))
                : provider.area_names || 'לא צוין'}
            </p>
            <p><strong>הערות:</strong> {provider.notes || 'אין הערות'}</p>
            <button onClick={() => setSelectedProvider(provider)}>הזמן ספק לאירוע</button>
          </div>
        ))}
      </div>

      {selectedProvider && (
        <OrderForm
          key={selectedProvider.id}
          provider={selectedProvider}
          eventId={eventId}
          clientId={clientId}
          eventDate={eventDate}
          onClose={() => setSelectedProvider(null)}
        />
      )}
    </div>
  );
}
