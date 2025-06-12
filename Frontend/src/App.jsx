import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
// import Register from './components/Register';

function App() {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={<Login setCurrentUser={setCurrentUser} />}
                />
                <Route
                    path="/:id/home"
                    element={<HomePage currentUser={currentUser} />}
                />
                {/* <Route path="/register" element={<Register />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
