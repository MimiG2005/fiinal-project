// // import mysql from 'mysql2'

// import mysql from 'mysql2'


// export var con = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Mimigins2005**',
//   database: 'eventify_db'
// });
// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE if not exists myProject", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
// // module.exports = pool;
import mysql from 'mysql2';

export var con = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Mimigins2005**', // שימי כאן את הסיסמה שלך
  database: 'eventify_db'
});

// export default pool;
