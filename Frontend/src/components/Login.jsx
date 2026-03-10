// import React, { useContext, useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GetUsersByUsernamePassword } from '../services/login.js';
// import '../styles/Login.css';
// import { userContext } from '../context/userContext.jsx';

// export default function Login() {

//   const { setCurrentUser } = useContext(userContext);
//   const [userdata, setUserdata] = useState({ email: '', password: '' });
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const existingUser = await GetUsersByUsernamePassword(userdata);
//       if (!existingUser) {
//         setErrorMessage('שם משתמש או סיסמה שגויים.');
//         return;
//       }
//       localStorage.setItem('token', existingUser.token);  // הוספת שמירת הטוקן
//       setCurrentUser(existingUser);
//       if (existingUser.role === 'client') {
//         navigate(`/${existingUser.id}/home`);
//       }
//       else if (existingUser.role === 'admin') {
//         navigate(`/admin/${existingUser.id}`);
//       }
//       else if (existingUser.role === 'provider') {
//         navigate(`/provider/${existingUser.id}`);
//       }
//     } catch (error) {
//       console.error('Login failed:', error);
//       setErrorMessage('שגיאה בהתחברות. נסה שוב.');
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit} className="form">
//         <h2 className="title">ברוך הבא</h2>

//         <label htmlFor="email" className="label">אימייל</label>
//         <input
//           type="email"
//           id="email"
//           value={userdata.email}
//           onChange={(e) =>
//             setUserdata({ ...userdata, email: e.target.value })
//           }
//           required
//           className="input"
//         />

//         <label htmlFor="password" className="label">סיסמה</label>
//         <input
//           type="password"
//           id="password"
//           value={userdata.password}
//           onChange={(e) =>
//             setUserdata({ ...userdata, password: e.target.value })
//           }
//           required
//           className="input"
//         />

//         <button type="submit" className="button">התחברות</button>
//         <Link to="/register" className="link">אין לך חשבון? הירשם</Link>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//       </form>
//     </div>
//   );
// }


import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GetUsersByUsernamePassword } from '../services/login.js';
import { userContext } from '../context/userContext.jsx';

// MUI imports
import { Box, Button, TextField, Typography, Alert } from '@mui/material';

export default function Login() {
  const { setCurrentUser } = useContext(userContext);
  const [userdata, setUserdata] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const existingUser = await GetUsersByUsernamePassword(userdata);
      if (!existingUser) {
        setErrorMessage('שם משתמש או סיסמה שגויים.');
        return;
      }
      localStorage.setItem('token', existingUser.token);
      setCurrentUser(existingUser);

      if (existingUser.role === 'client') navigate(`/${existingUser.id}/home`);
      else if (existingUser.role === 'admin') navigate(`/admin/${existingUser.id}`);
      else if (existingUser.role === 'provider') navigate(`/provider/${existingUser.id}`);
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('שגיאה בהתחברות. נסה שוב.');
    }
  };

  return (
    <Box
      sx={{
        width: 400,
        mx: 'auto',        // margin horizontal auto → למרכז
        mt: 10,
        p: 4,
        border: '1px solid #ccc',
        borderRadius: 2,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Typography variant="h4" align="center">ברוך הבא</Typography>

      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="אימייל"
          type="email"
          value={userdata.email}
          onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
          required
          fullWidth
        />

        <TextField
          label="סיסמה"
          type="password"
          value={userdata.password}
          onChange={(e) => setUserdata({ ...userdata, password: e.target.value })}
          required
          fullWidth
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          התחברות
        </Button>
      </Box>

      <Typography align="center">
        <Link to="/register" style={{ textDecoration: 'none' }}>אין לך חשבון? הירשם</Link>
      </Typography>
    </Box>
  );
}