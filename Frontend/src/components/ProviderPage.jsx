import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import PendingOrders from './PendingOrders';
import ApprovedOrders from './ApprovedOrders';
import OrdersHistory from './OrdersHistory';
import UpdateProfile from './UpdateProfile';

export default function ProviderPage() {
  const [activeTab, setActiveTab] = useState('pending');

  const { currentUser, handleLogout } = useContext(userContext);


  

  const renderContent = () => {
    switch (activeTab) {
      case 'pending':
        return <PendingOrders providerId={currentUser?.id} />;
      case 'approved':
        return <ApprovedOrders providerId={currentUser?.id} />; // אם יש קומפוננטה, אפשר להחזיר אותה
      case 'history':
        return <OrdersHistory providerId={currentUser?.id} />;
      case 'update':
        return <UpdateProfile providerId={currentUser?.id} />;
      default:
        return null;
    }
  };

  return (
    <div className="home-container">
      <header className="navbar">
        <h2>ברוך הבא ספק {currentUser?.full_name || ''}</h2>
        <nav className="nav-buttons">
          <button onClick={() => setActiveTab('pending')} className={`nav-button ${activeTab === 'pending' ? 'active' : ''}`}>
            הזמנות בהמתנה
          </button>
          <button onClick={() => setActiveTab('approved')} className={`nav-button ${activeTab === 'approved' ? 'active' : ''}`}>
            הזמנות מאושרות
          </button>
          <button onClick={() => setActiveTab('history')} className={`nav-button ${activeTab === 'history' ? 'active' : ''}`}>
            היסטורית הזמנות
          </button>
          <button onClick={() => setActiveTab('update')} className={`nav-button ${activeTab === 'update' ? 'active' : ''}`}>
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
        {renderContent()}
      </main>
    </div>
  );
}
