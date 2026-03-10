// import React, { useState, useContext, use } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';
// import '../styles/HomePage.css';

// import { userContext } from '../context/userContext';
// export default function AdminPage() {
//   const navigate = useNavigate();

//   const { pathname } = useLocation();
//   let activeTab = pathname.split('/')[pathname.split('/').length - 1];

//   const { currentUser, handleLogout } = useContext(userContext);
//   return (
//     <div className="home-container">
//       <header className="navbar">
//         <h2>ברוך הבא מנהל {currentUser?.full_name || ''}</h2>
//         <nav className="nav-buttons">
//           <button onClick={() => navigate('clients')} className={`nav-button ${activeTab === 'clients' ? 'active' : ''}`}>
//             לקוחות
//           </button>
//           <button onClick={() => navigate('providers')} className={`nav-button ${activeTab === 'providers' ? 'active' : ''}`}>
//             ספקים
//           </button>
//           <button onClick={() => navigate('admins')} className={`nav-button ${activeTab === 'admins' ? 'active' : ''}`}>
//             מנהלים
//           </button>
//           <button onClick={() => navigate('orders')} className={`nav-button ${activeTab === 'orders' ? 'active' : ''}`}>
//             הזמנות
//           </button>
//           <button onClick={handleLogout} className="nav-button logout-button"
//             style={{ marginRight: 'auto', backgroundColor: '#d9534f', color: 'white' }}
//           >
//             התנתקות
//           </button>
//         </nav>
//       </header>

//       <main className="content-area">

//         <Outlet />
//       </main>
//     </div>

//   );
// }

import React, { useContext } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { userContext } from '../context/userContext';

import {
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  Button,
  Box
} from '@mui/material';

export default function AdminPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { currentUser, handleLogout } = useContext(userContext);

  const activeTab = pathname.split('/')[pathname.split('/').length - 1];

  const handleChange = (event, newValue) => {
    navigate(newValue);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

          <Typography variant="h6">
            ברוך הבא מנהל {currentUser?.full_name || ''}
          </Typography>

          <Tabs
            value={activeTab}
            onChange={handleChange}
            textColor="inherit"
            indicatorColor="secondary"
          >
            <Tab label="לקוחות" value="clients" />
            <Tab label="ספקים" value="providers" />
            <Tab label="מנהלים" value="admins" />
          {/* <Tab label="הזמנות" value="orders" /> */}
          </Tabs>

          <Button
            variant="contained"
            color="error"
            onClick={handleLogout}
          >
            התנתקות
          </Button>

        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Outlet />
      </Box>

    </Box>
  );
}