import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { RegisterClient } from '../services/register';
import '../styles/Login.css'; // השתמשי באותו CSS לעיצוב אחיד
import { userContext } from '../context/userContext';

export default function Register() {
  const [client, setClient] = useState({
    full_name: '',
    email: '',
    password: '',
    address: '',
    phone: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(userContext);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await RegisterClient(client);
      if (result && result.id) {
        localStorage.setItem('userId', JSON.stringify(result.id));
        localStorage.setItem('token', result.token);  // הוספת שמירת הטוקן
        setCurrentUser(result);
        navigate(`/${result.id}/home`);

      } else {
        setErrorMessage('אירעה שגיאה בהרשמה.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('ההרשמה נכשלה. ייתכן שהאימייל כבר קיים.');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2 className="title">הרשמה</h2>

        <label className="label">שם מלא</label>
        <input className="input" name="full_name" value={client.full_name} onChange={handleChange} required />

        <label className="label">אימייל</label>
        <input className="input" name="email" type="email" value={client.email} onChange={handleChange} required />

        <label className="label">סיסמה</label>
        <input className="input" name="password" type="password" value={client.password} onChange={handleChange} required />

        <label className="label">כתובת</label>
        <input className="input" name="address" value={client.address} onChange={handleChange} />

        <label className="label">טלפון</label>
        <input className="input" name="phone" value={client.phone} onChange={handleChange} />

        <button type="submit" className="button">הרשמה</button>

        <Link to="/" className="link">יש לך חשבון? התחבר</Link>

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
