import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByEmail, findUserById } from '../services/login.js';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }


    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30m' }
    );

      // חשוב – לא להחזיר סיסמה
    delete user.password;



    res.status(200).json({
      message: 'Login successful',
      token,
     ...user
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


export const relogin = async (req, res) => {
  const { id, role } = req.user;
  try {
    const user = await findUserById(id, role);

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error('ReLogin error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};