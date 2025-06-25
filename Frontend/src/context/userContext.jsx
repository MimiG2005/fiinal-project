import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const userContext = createContext(null);

const userProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {

        const token = localStorage.getItem('token');
        console.log(token);
        const relogin = async () => {

            try {
                const res = await fetch(`http://localhost:3001/api/login/relogin`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` }
                })
                const data = await res.json()
                console.log(data);
                setCurrentUser(data);
            }
            catch (err) {
                navigate('/');
            }
            // setCurrentUser({ id: token });
        }
        if (token) {
            relogin();
        }
        else {
            navigate('/')
        }
    }, []);

    function handleLogout() {
        setCurrentUser(null);
        localStorage.removeItem('token');
        navigate('/');
    }
    return (
        <userContext.Provider value={{ currentUser, setCurrentUser, handleLogout }}>
            {children}
        </userContext.Provider>
    )
}
export default userProvider