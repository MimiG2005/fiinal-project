import { useContext } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';

import '../styles/HomePage.css';
import { userContext } from '../context/userContext';
import { EventContext } from '../context/eventContext';

const HomePage = () => {

  const navigate = useNavigate();
  const { currentUser, handleLogout } = useContext(userContext);
  const { selectedEvent } = useContext(EventContext);


  const { pathname } = useLocation();
  let activeTab = pathname.split('/')[pathname.split('/').length - 1];




  return (
    <div className="home-container">
      <header className="navbar">
        <h1 className="logo">Event Manager</h1>
        <div>{currentUser ? <span>ברוך/ה שבאת</span> : <div>מא להקקש</div>}</div>
        <nav className="nav-buttons">
          <button
            onClick={() => navigate('create')}
            className={`nav-button ${activeTab === 'create' ? 'active' : ''}`}
          >
            הוספת אירוע
          </button>
          <button
            onClick={() => navigate('view')}
            className={`nav-button ${activeTab === 'view' ? 'active' : ''}`}
          >
            צפייה באירועים
          </button>
          <button
            onClick={() => navigate('current')}
            disabled={!selectedEvent}
            className={`nav-button ${activeTab === 'current' ? 'active' : ''}`}
          >
            אירוע נוכחי
          </button>
          <button
            onClick={handleLogout}
            className="nav-button logout-button"
            style={{ marginRight: 'auto', backgroundColor: '#d9534f', color: 'white' }}
          >
            התנתקות
          </button>
        </nav>

      </header>

      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
