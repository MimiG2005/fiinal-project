import bcrypt from 'bcrypt';
// // // import { con } from './db.js';

// // // const hashPasswords = async () => {
// // //   con.query('SELECT id, password FROM eventify_db.admins', async (err, users) => {
// // //     if (err) {
// // //       console.error(err);
// // //       process.exit(1);
// // //     }

// // //     for (const user of users) {
// // //       // אם כבר מוצפן – מדלגים
// // //       if (user.password && user.password.startsWith('$2')) {
// // //         continue;
// // //       }

// // //       const hashedPassword = await bcrypt.hash(user.password, 10);

// // //       con.query(
// // //         'UPDATE eventify_db.admins SET password = ? WHERE id = ?',
// // //         [hashedPassword, user.id]
// // //       );
// // //     }

// // //     console.log('✅ סיום הצפנת סיסמאות קיימות');
// // //     process.exit();
// // //   });
// // // };

// // // hashPasswords();
// // import bcrypt from 'bcrypt';
// // import { con } from './db.js';
// // import util from 'util';

// // const query = util.promisify(con.query).bind(con);

// // const updateDanaPassword = async () => {
// //   try {
// //     // שולפים את דנה כהן
// //     const users = await query(
// //       'SELECT id, password FROM eventify_db.admins WHERE full_name = ?',
// //       ['דנה כהן']
// //     );

// //     if (users.length === 0) {
// //       console.log('לא נמצא משתמש בשם דנה כהן');
// //       process.exit();
// //     }

// //     const user = users[0];

// //     if (user.password.startsWith('$2')) {
// //       console.log('הסיסמה כבר מוצפנת');
// //       process.exit();
// //     }

// //     // עושים hash לסיסמה
// //     const hashedPassword = await bcrypt.hash(user.password, 10);

// //     // מעדכנים בטבלה
// //     await query('UPDATE eventify_db.admins SET password = ? WHERE id = ?', [
// //       hashedPassword,
// //       user.id,
// //     ]);

// //     console.log('✅ הסיסמה של דנה כהן עודכנה בהצלחה');
// //     process.exit();
// //   } catch (e) {
// //     console.error(e);
// //     process.exit(1);
// //   }
// // };

// // updateDanaPassword();

// const bcrypt = require("bcrypt");
// const mysql = require("mysql2/promise");

// async function changePassword() {
//   const connection = await mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "your_database_name"
//   });

//   const newPassword = "123456";
//   const hashedPassword = await bcrypt.hash(newPassword, 10);

//   await connection.execute(
//     "UPDATE providers SET password=? WHERE email=?",
//     [hashedPassword, "uriel.photo@gmail.com"]
//   );

//   console.log("Password updated");
//   await connection.end();
// }

// changePassword();


const password = "123456";

const hash = await bcrypt.hash(password, 10);

console.log(hash);