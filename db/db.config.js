const mysql = require("mysql2/promise");

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit: 10,
};

const db = mysql.createPool(dbConfig);

console.log(
  `Conectado a la base de datos ${process.env.DB_HOST}: ${process.env.DB_NAME}`
);

module.exports = db;
