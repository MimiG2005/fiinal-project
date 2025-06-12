import jwt from 'jsonwebtoken';
import { findUserByEmailAndPassword } from '../services/login.js';

const JWT_SECRET = 'secretKey123'; // שמרי בסביבה בטוחה - dotenv או env

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmailAndPassword(email, password);

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            role: user.role,
            userId: user.id,
            fullName: user.full_name
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
