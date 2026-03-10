// controllers/admins.js

import {
    QueryListOfAdmins,
    QueryAdminById,
    QueryCreateAdmin,
    QueryUpdateAdmin,
    QueryDeleteAdmin
} from '../services/admins.js';

export const getAllAdmins = async (req, res) => {
    try {
        const admins = await QueryListOfAdmins();
        res.status(200).json(admins);
    } catch (err) {
        console.error('Error in getAllAdmins:', err);
        res.status(500).json({ error: 'Failed to retrieve admins', details: err.message });
    }
};

export const getAdminById = async (req, res) => {
    try {
        const admin = await QueryAdminById(req.params.id);
        if (admin.length === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json(admin[0]);
    } catch (err) {
        console.error('Error in getAdminById:', err);
        res.status(500).json({ error: 'Failed to retrieve admin', details: err.message });
    }
};

// export const createAdmin = async (req, res) => {
//     try {
//         const result = await QueryCreateAdmin(req.body);
//         res.status(201).json({ message: 'Admin created successfully', id: result.insertId });
//     } catch (err) {
//         console.error('Error in createAdmin:', err);
//         res.status(500).json({ error: 'Failed to create admin', details: err.message });
//     }
// };
import bcrypt from 'bcrypt';
// import { QueryCreateAdmin } from './queries.js'; // ודאי שזה ה־import הנכון

export const createAdmin = async (req, res) => {
  try {
    const { full_name, email, password, phone } = req.body;

    // 1️⃣ הצפנת הסיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    // 2️⃣ שליחה ל־Query עם הסיסמה המוצפנת
    const result = await QueryCreateAdmin({
      full_name,
      email,
      password: hashedPassword,
      phone
    });

    console.log(result);
    res.status(201).json({ message: 'Admin created successfully', id: result.insertId });

  } catch (err) {
    console.error('Error in createAdmin:', err);

    // אם רוצים טיפול בשגיאת כפילות של אימייל
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists', details: err.message });
    }

    res.status(500).json({ error: 'Failed to create admin', details: err.message });
  }
};

// export const updateAdmin = async (req, res) => {
//     try {
//         const result = await QueryUpdateAdmin(req.params.id, req.body);
//         if (result.affectedRows === 0) {
//             return res.status(404).json({ message: 'Admin not found or no changes made' });
//         }
//         res.status(200).json({ message: 'Admin updated successfully', data: result });
//     } catch (err) {
//         console.error('Error in updateAdmin:', err);
//         res.status(500).json({ error: 'Failed to update admin', details: err.message });
//     }
// };

export const updateAdmin = async (req, res) => {
  try {
    const { password, ...rest } = req.body;

    let updateData = { ...rest };

    // אם שולחים סיסמה חדשה, מצפינים אותה
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const result = await QueryUpdateAdmin(req.params.id, updateData);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Admin not found or no changes made' });
    }

    res.status(200).json({ message: 'Admin updated successfully', data: result });

  } catch (err) {
    console.error('Error in updateAdmin:', err);

    // טיפול בשגיאת אימייל כפול (UNIQUE constraint)
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists', details: err.message });
    }

    res.status(500).json({ error: 'Failed to update admin', details: err.message });
  }
};

export const deleteAdmin = async (req, res) => {
    try {
        const result = await QueryDeleteAdmin(req.params.id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({ message: 'Admin deleted successfully', data: result });
    } catch (err) {
        console.error('Error in deleteAdmin:', err);
        res.status(500).json({ error: 'Failed to delete admin', details: err.message });
    }
};

export default {
    getAllAdmins,
    getAdminById,
    createAdmin,
    updateAdmin,
    deleteAdmin
};
