import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GetUsersByUsernamePassword } from '../services/login.js';
import '../styles/Login.css';
import { userContext } from '../context/userContext.jsx';

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
      localStorage.setItem('token', existingUser.token);  // הוספת שמירת הטוקן
      setCurrentUser(existingUser);
      if (existingUser.role === 'client') {
        navigate(`/${existingUser.userId}/home`);
      }
      else if (existingUser.role === 'admin') {
        navigate(`/admin/${existingUser.userId}`);
      }
      else if (existingUser.role === 'provider') {
        navigate(`/provider/${existingUser.userId}`);
      }
    } catch (error) {
      console.error('Login failed:', error);
      setErrorMessage('שגיאה בהתחברות. נסה שוב.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">ברוך הבא</h2>

        <label htmlFor="email" className="label">אימייל</label>
        <input
          type="email"
          id="email"
          value={userdata.email}
          onChange={(e) =>
            setUserdata({ ...userdata, email: e.target.value })
          }
          required
          className="input"
        />

        <label htmlFor="password" className="label">סיסמה</label>
        <input
          type="password"
          id="password"
          value={userdata.password}
          onChange={(e) =>
            setUserdata({ ...userdata, password: e.target.value })
          }
          required
          className="input"
        />

        <button type="submit" className="button">התחברות</button>
        <Link to="/register" className="link">אין לך חשבון? הירשם</Link>
        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
