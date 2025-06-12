
// import db from '../db.js';

// const getAllClients = async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT * FROM clients');
//     res.json(rows);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// const createClient = async (req, res) => {
//   // ודאי שהשדות מגיעים ב-req.body בסדר כלשהו,
//   // אבל חשוב שהם יהיו זמינים לפני השימוש.
//   const { full_name, email, password, address, phone } = req.body; // שיניתי את הסדר כאן כדי שיהיה ברור

//   try {
//     await db.query(
//       'INSERT INTO clients (full_name, email, password, address, phone) VALUES (?, ?, ?, ?, ?)',
//       [full_name, email, password, address, phone] // סדר הערכים כאן חייב להתאים לסדר השדות בשאילתה
//     );
//     res.status(201).json({ message: 'Client created successfully' });
//   } catch (err) {
//     // עדיף לא לחשוף את err.message ישירות למשתמש ב-production,
//     // אלא ללוגג אותו ולשלוח הודעה כללית יותר.
//     res.status(500).json({ error: 'Failed to create client', details: err.message });
//   }
// };

// export default {
//   getAllClients,
//   createClient
// };
// controllers/clientsController.js
import {
    QueryListOfClients,
    QueryClientById,
    QueryCreateClient,
    QueryUpdateClient,
    QueryDeleteClient
} from '../services/client.js'; // ודא/י שהנתיב לקובץ ה-service נכון

export const getAllClients = async (req, res) => {
  console.log('getAllClients');
    try {
        const clients =  await QueryListOfClients();
        console.log('clients:', clients);
        res.status(200).json(clients);
        console.log('res:', res);
    } catch (err) {
        console.error('Error in getAllClients:', err);
        res.status(500).json({ error: 'Failed to retrieve clients', details: err.message });
    }
};

export const getClientById = async (req, res) => {
    try {
        const client = await QueryClientById(req.params.id);
        if (client.length === 0) {
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json(client[0]); // החזר את הלקוח הראשון שנמצא
    } catch (err) {
        console.error('Error in getClientById:', err);
        res.status(500).json({ error: 'Failed to retrieve client', details: err.message });
    }
};

export const createClient = async (req, res) => {
    try {
        const result = await QueryCreateClient(req.body);
        // בד"כ כשמוסיפים שורה, result מכיל מידע כמו insertId
        res.status(201).json({ message: 'Client created successfully', id: result.insertId });
    } catch (err) {
        console.error('Error in createClient:', err);
        // טיפול בשגיאת אימייל כפול במקרה של UNIQUE
        if (err.code === 'ER_DUP_ENTRY') { // MySQL specific error code for duplicate entry
            return res.status(409).json({ error: 'Email already exists', details: err.message });
        }
        res.status(500).json({ error: 'Failed to create client', details: err.message });
    }
};

export const updateClient = async (req, res) => {
    try {
        const result = await QueryUpdateClient(req.params.id, req.body);
        if (result.affectedRows === 0) { // אם לא נמצא לקוח עם ה-ID הזה לעדכן
            return res.status(404).json({ message: 'Client not found or no changes made' });
        }
        res.status(200).json({ message: 'Client updated successfully', data: result });
    } catch (err) {
        console.error('Error in updateClient:', err);
        // טיפול בשגיאת אימייל כפול במקרה של UNIQUE בעדכון
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Email already exists', details: err.message });
        }
        res.status(500).json({ error: 'Failed to update client', details: err.message });
    }
};

export const deleteClient = async (req, res) => {
    try {
        const result = await QueryDeleteClient(req.params.id);
        if (result.affectedRows === 0) { // אם לא נמצא לקוח עם ה-ID הזה למחיקה
            return res.status(404).json({ message: 'Client not found' });
        }
        res.status(200).json({ message: 'Client deleted successfully', data: result });
    } catch (err) {
        console.error('Error in deleteClient:', err);
        res.status(500).json({ error: 'Failed to delete client', details: err.message });
    }
};

// ייצוא אובייקט עם כל הפונקציות כדי להתאים לתבנית הישנה שלך,
// למרות שעדיף לייצא כל אחת בנפרד כמו ב-users.js
export default {
    getAllClients,
    getClientById,
    createClient,
    updateClient,
    deleteClient
};