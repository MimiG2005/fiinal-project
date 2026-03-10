import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

import { useContext } from 'react';
import { userContext } from '../context/userContext';

export default function ProviderPage() {
  const { pathname } = useLocation();
  let activeTab = pathname.split('/')[pathname.split('/').length - 1];
  
  const navigate = useNavigate();
  const { currentUser, handleLogout } = useContext(userContext);






  return (
    <div className="home-container">
      <header className="navbar">
        <h2>ברוך הבא ספק {currentUser?.full_name || ''}</h2>
        <nav className="nav-buttons">
          <button onClick={() => navigate('pending')} className={`nav-button ${activeTab === 'pending' ? 'active' : ''}`}>
            הזמנות בהמתנה
          </button>
          <button onClick={() => navigate('approved')} className={`nav-button ${activeTab === 'approved' ? 'active' : ''}`}>
            הזמנות מאושרות
          </button>
          <button onClick={() => navigate('history')} className={`nav-button ${activeTab === 'history' ? 'active' : ''}`}>
            היסטורית הזמנות
          </button>
          <button onClick={() => navigate('update')} className={`nav-button ${activeTab === 'update' ? 'active' : ''}`}>
            עדכון פרטים אישיים
          </button>
          <button onClick={handleLogout} className="nav-button logout-button"
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
}
