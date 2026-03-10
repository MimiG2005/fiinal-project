
// import { createTheme } from '@mui/material/styles';

// const theme = createTheme({
//   palette: {
//     primary: { main: '#1976d2' },
//     secondary: { main: '#f50057' },
//   },
//   typography: {
//     fontFamily: 'Roboto, Arial, sans-serif',
//   },
// });

// export default theme;

// theme.js
import { createTheme } from '@mui/material/styles';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

// יצירת cache עבור RTL
export const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
});

// יצירת Theme עם כיוון RTL
export const theme = createTheme({
  direction: 'rtl', // <-- RTL
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});