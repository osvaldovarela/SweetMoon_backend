const db = require("../db/db.config");

exports.cargarLogin = async (email, contraseña, usuario_id) => {
  await db.query(
    `INSERT INTO login (email, contraseña, usuario_id) VALUES (?, ?, ?)`,
    [email, contraseña, usuario_id]
  );
};
