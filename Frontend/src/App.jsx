import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import HomePage from './components/HomePage';
import AdminPage from './components/AdminPage'; // ודאי שקובץ זה קיים
import ProviderPage from './components/ProviderPage';
import CreateEventPage from './components/CreateEvent'; // לדוגמה
import ClientsList from './components/ClientsList';
import ProvidersList from './components/ProvidersList';
import AdminsList from './components/AdminsList';
import OrdersList from './components/OrdersList';
import CurrentEventPage from './components/CurrentEventPage';
import ViewEventsPage from './components/ViewEventsPage';
import OrdersHistory from './components/OrdersHistory';
import PendingOrders from './components/PendingOrders';
import ApprovedOrders from './components/ApprovedOrders';
import UpdateProfile from './components/UpdateProfile';

function App() {

    return (
        <Routes>
            <Route
                path="/"
                element={<Login />}
            />
            <Route
                path="/register"
                element={<Register />}
            />
            <Route
                path="/:id/home"
                element={<HomePage />}
            >
                <Route path='create' element={<CreateEventPage />} />
                <Route path='view' element={<ViewEventsPage />} />
                <Route path='current' element={<CurrentEventPage />} />

            </Route>
            <Route path="/admin/:id" element={<AdminPage />}>
                <Route path='clients' element={<ClientsList />} />
                <Route path='providers' element={<ProvidersList />} />
                <Route path='admins' element={<AdminsList />} />
                <Route path='orders' element={<OrdersList />} />
            </Route>


            <Route path="/provider/:id" element={<ProviderPage />} >
                <Route path='pending' element={<PendingOrders />} />
                <Route path='approved' element={<ApprovedOrders />} />
                <Route path='history' element={<OrdersHistory />} />
                <Route path='update' element={<UpdateProfile />} />

            </Route>

            <Route
                path="/create-event/:clientId"
                element={<CreateEventPage />}
            />
        </Routes>
    );
}

export default App;
