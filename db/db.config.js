const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((error) => {
  if (error) {
    return console.error(error.stack);
  }

  console.log("Conectado a la base de datos en AlwaysData");
});

module.exports = connection;
