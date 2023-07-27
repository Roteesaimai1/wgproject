const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Ab12345!",
  database: "db_wg",
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

module.exports = connection;