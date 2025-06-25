import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import UserProvider from './context/userContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import EventProvider from './context/eventContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
