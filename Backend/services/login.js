import { con } from '../db.js';

export const findUserByEmailAndPassword = (email, password) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id, full_name, email, password, 'client' AS role FROM clients WHERE email = ? AND password = ?`
        //     UNION
        //     SELECT id, full_name, email, password, 'provider' AS role FROM providers WHERE email = ? AND password = ?
        //     UNION
        //     SELECT id, full_name, email, password, 'admin' AS role FROM admins WHERE email = ? AND password = ?
        // 
        // ;
const params = [email, password];

        con.query(query, params, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results[0]); // נניח שמיילים ייחודיים ולכן נחזיר רק אחד
            }
        });
    });
};
