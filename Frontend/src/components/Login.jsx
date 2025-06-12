// // import React, { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import { GetUsersByUsernamePassword } from '../services/login.js';

// // export default function Login({ setCurrentUser }) {
// //     const [userdata, setUserdata] = useState({
// //         name: '',
// //         password: ''
// //     });
// //     const [errorMessage, setErrorMessage] = useState('');
// //     const navigate = useNavigate();

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         try {
// //             const existingUser = await GetUsersByUsernamePassword(userdata);

// //             if (!existingUser) {
// //                 setErrorMessage('Username or password is incorrect. Please try again.');
// //                 return;
// //             }

// //             localStorage.setItem('userId', JSON.stringify(existingUser.id));
// //             setCurrentUser(existingUser);
// //             navigate(`/user/${existingUser.id}/home`);
// //         } catch (error) {
// //             console.error('Login failed:', error);
// //             setErrorMessage('Login failed. Please try again.');
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit}>
// //             <label htmlFor="username">שם משתמש:</label>
// //             <input
// //                 type="text"
// //                 id="username"
// //                 value={userdata.name}
// //                 onChange={(e) => setUserdata((prevUser) => ({
// //                     ...prevUser,
// //                     name: e.target.value,
// //                 }))}
// //                 required
// //             />

// //             <label htmlFor="password">הסיסמה שלך:</label>
// //             <input
// //                 type="password"
// //                 id="password"
// //                 value={userdata.password}
// //                 onChange={(e) => setUserdata((prevUser) => ({
// //                     ...prevUser,
// //                     password: e.target.value,
// //                 }))}
// //                 required
// //             />

// //             <button type="submit">כניסה</button>

// //             <Link to="/register">לעמוד הרשמה</Link>

// //             {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
// //         </form>
// //     );
// // }


// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { GetUsersByUsernamePassword } from '../services/login.js';
// import  '../styles/Login.css';

// export default function Login({ setCurrentUser }) {
//   const [userdata, setUserdata] = useState({ name: '', password: '' });
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
//       localStorage.setItem('userId', JSON.stringify(existingUser.id));
//       setCurrentUser(existingUser);
//       navigate(`/${existingUser.id}/home`);
//     } catch (error) {
//       console.error('Login failed:', error);
//       setErrorMessage('שגיאה בהתחברות. נסה שוב.');
//     }
//   };

//   return (
//     <div className="container">
//       <form onSubmit={handleSubmit} className="form">
//         <h2 className="title">ברוך הבא</h2>

//         <label htmlFor="username" className="label">שם משתמש</label>
//         <input
//           type="text"
//           id="username"
//           value={userdata.name}
//           onChange={(e) =>
//             setUserdata({ ...userdata, name: e.target.value })
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


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GetUsersByUsernamePassword } from '../services/login.js';
import '../styles/Login.css';

export default function Login({ setCurrentUser }) {
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
      localStorage.setItem('userId', JSON.stringify(existingUser.userId));
      localStorage.setItem('token', existingUser.token);  // הוספת שמירת הטוקן
      setCurrentUser(existingUser);
      navigate(`/${existingUser.userId}/home`);
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

        {/* <Link to="/register" className="link">אין לך חשבון? הירשם</Link> */}

        {errorMessage && <p className="error">{errorMessage}</p>}
      </form>
    </div>
  );
}
