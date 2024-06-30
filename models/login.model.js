const db = require("../db/db.config");

exports.cargarLogin = async (email, contraseña, usuario_id) => {
  try {
    const [result] = db.query(
      `INSERT INTO login (email, contraseña, usuario_id) VALUES (?, ?, ?)`,
      [email, contraseña, usuario_id]
    );
    return result;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      //aqui el manejo del error de email ya en uso
      throw new Error("Error: El email ya está en uso.");
    } else {
      throw new Error("Error en la consulta: ", error);
    }
  }
};

exports.updateLogin = async (email, contraseña, usuario_id) => {
  const sql = "UPDATE login SET email = ?, contraseña = ? WHERE usuario_id = ?";
  try {
    const [result] = await db.query(sql, [email, contraseña, usuario_id]);
    return result;
  } catch (error) {
    throw new Error("Error al actualizar login: " + error.message);
  }
};

// TRAER USUARIO_ID SEGUN EMAIL
exports.find = async (email) => {
  const query = "SELECT * FROM login WHERE email = ?";
  const [user] = await db.execute(query, [email]);
  return user; // Devuelve el usuario encontrado o `undefined` si no se encuentra
};
