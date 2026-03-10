// import { useContext } from 'react';
// import { useNavigate, Outlet, useLocation } from 'react-router-dom';

// import '../styles/HomePage.css';
// import { userContext } from '../context/userContext';
// import { EventContext } from '../context/eventContext';

// const HomePage = () => {

//   const navigate = useNavigate();
//   const { currentUser, handleLogout } = useContext(userContext);
//   const { selectedEvent } = useContext(EventContext);


//   const { pathname } = useLocation();
//   let activeTab = pathname.split('/')[pathname.split('/').length - 1];




//   return (
//     <div className="home-container">
//       <header className="navbar">
//         <h1 className="logo">Event Manager</h1>
//         <div>{currentUser ? <span>ברוך/ה שבאת</span> : <div>מא להקקש</div>}</div>
//         <nav className="nav-buttons">
//           <button
//             onClick={() => navigate('create')}
//             className={`nav-button ${activeTab === 'create' ? 'active' : ''}`}
//           >
//             הוספת אירוע
//           </button>
//           <button
//             onClick={() => navigate('view')}
//             className={`nav-button ${activeTab === 'view' ? 'active' : ''}`}
//           >
//             צפייה באירועים
//           </button>
//           <button
//             onClick={() => navigate('current')}
//             disabled={!selectedEvent}
//             className={`nav-button ${activeTab === 'current' ? 'active' : ''}`}
//           >
//             אירוע נוכחי
//           </button>
//           <button
//             onClick={handleLogout}
//             className="nav-button logout-button"
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
// };

// export default HomePage;


import React, { useContext } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { userContext } from '../context/userContext';
import { EventContext } from '../context/eventContext';

// MUI imports
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const HomePage = () => {
  const navigate = useNavigate();
  const { currentUser, handleLogout } = useContext(userContext);
  const { selectedEvent } = useContext(EventContext);

  const { pathname } = useLocation();
  let activeTab = pathname.split('/')[pathname.split('/').length - 1];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6">Event Manager</Typography>

          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            {currentUser ? (
              <Typography variant="subtitle1">ברוך/ה שבאת</Typography>
            ) : (
              <Typography variant="subtitle1">מא להקקש</Typography>
            )}

            <Button
              color={activeTab === 'create' ? 'secondary' : 'inherit'}
              variant={activeTab === 'create' ? 'contained' : 'text'}
              onClick={() => navigate('create')}
            >
              הוספת אירוע
            </Button>

            <Button
              color={activeTab === 'view' ? 'secondary' : 'inherit'}
              variant={activeTab === 'view' ? 'contained' : 'text'}
              onClick={() => navigate('view')}
            >
              צפייה באירועים
            </Button>

            <Button
              color={activeTab === 'current' ? 'secondary' : 'inherit'}
              variant={activeTab === 'current' ? 'contained' : 'text'}
              onClick={() => navigate('current')}
              disabled={!selectedEvent}
            >
              אירוע נוכחי
            </Button>

            <Button
              onClick={handleLogout}
              variant="contained"
              sx={{ backgroundColor: '#d9534f', color: 'white', ml: 2 }}
            >
              התנתקות
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ flex: 1, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default HomePage;