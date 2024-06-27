const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

connection.connect((error) => {
  if (error) {
    return console.error(error.stack);
  }

  console.log(
    `Conectado a la base de datos ${process.env.DB_HOST}: ${process.env.DB_NAME}`
  );
});

module.exports = connection;
