import { con } from '../db.js';

export const QueryAllAreas = () => {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM areas', (err, result) => {
      if (err) {
        console.error(err);
        reject(new Error('Failed to fetch areas'));
      } else {
        resolve(result);
      }
    });
  });
};