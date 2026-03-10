import { con } from '../db.js';

export const findUserByEmail = (email,password) => {
  return new Promise((resolve, reject) => {
    // const query = ` 
    //   SELECT id, full_name, email,  phone, address, service_type_id, role FROM allusers WHERE email = ? COLLATE utf8mb4_0900_ai_ci
    // `;

       const query = `
      SELECT id, full_name, email, phone, address,
             service_type_id, role, password
      FROM allusers
      WHERE email = ? COLLATE utf8mb4_0900_ai_ci
    `;

    const params = [email];

    con.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // מחזיר את המשתמש הראשון שנמצא
      }
    });
  });
};


export const findUserById = (id, role) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT id, full_name, email,  phone, address, service_type_id, role FROM allusers WHERE id = ? and role = ? COLLATE utf8mb4_0900_ai_ci;`;
    const params = [id, role];
    con.query(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]); // מחזיר את המשתמש הראשון שנמצא
      }
    });
  });
};

