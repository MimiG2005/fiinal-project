// services/admins.js
import { con } from '../db.js';

export const QueryListOfAdmins = () => {
  return new Promise((resolve, reject) => {
    con.query("SELECT id, full_name, email, phone FROM admins", (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Failed to retrieve admins'));
      } else {
        resolve(result);
      }
    });
  });
};

export const QueryAdminById = (id) => {
  return new Promise((resolve, reject) => {
    con.query("SELECT id, full_name, email, phone FROM admins WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Failed to retrieve admin'));
      } else {
        resolve(result);
      }
    });
  });
};

export const QueryCreateAdmin = (admin) => {
  const { full_name, email, password, phone } = admin;

  return new Promise((resolve, reject) => {
    con.query(
      "INSERT INTO admins (full_name, email, password, phone) VALUES (?, ?, ?, ?)",
      [full_name, email, password, phone || null],
      (err, result) => {
        if (err) {
          console.error(err);
          reject(new Error('Failed to create admin'));
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const QueryUpdateAdmin = (id, admin) => {
  return new Promise((resolve, reject) => {
    con.query("UPDATE admins SET ? WHERE id = ?", [admin, id], (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Failed to update admin'));
      } else {
        resolve(result);
      }
    });
  });
};

export const QueryDeleteAdmin = (id) => {
  return new Promise((resolve, reject) => {
    con.query("DELETE FROM admins WHERE id = ?", [id], (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Failed to delete admin'));
      } else {
        resolve(result);
      }
    });
  });
};
