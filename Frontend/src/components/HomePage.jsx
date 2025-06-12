import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const HomePage = ({ currentUser }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(currentUser);

    useEffect(() => {
        // אם currentUser לא קיים ננסה לשלוף מה-localStorage
        if (!user) {
            const savedUserId = localStorage.getItem('userId');
            if (savedUserId && savedUserId === id) {
                // אם צריך – ניתן לבצע כאן fetch נוסף מהשרת לקבלת פרטי המשתמש
                setUser({ id: savedUserId, full_name: 'משתמש שמור' });
            } else {
                navigate('/');
            }
        }
    }, [id, user, navigate]);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>ברוך הבא{user?.full_name ? `, ${user.full_name}` : ''}!</h1>
            <p>זהו עמוד הבית שלך.</p>
        </div>
    );
};

export default HomePage;
