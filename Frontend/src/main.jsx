// import React from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import App from './App.jsx';
// import UserProvider from './context/userContext.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import EventProvider from './context/eventContext.jsx';
// import { ThemeProvider } from '@mui/material/styles';   // <-- ייבוא
// import theme from './styles/theme'; 

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from '@mui/material/styles';
import { theme, cacheRtl } from './styles/theme';
import { CacheProvider } from '@emotion/react';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/userContext.jsx';
import EventProvider from './context/eventContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>  
    <BrowserRouter>
      <UserProvider>
        <EventProvider>
          <App />
        </EventProvider>
      </UserProvider>
    </BrowserRouter>
        </ThemeProvider>
        </CacheProvider>
  </React.StrictMode>
);
