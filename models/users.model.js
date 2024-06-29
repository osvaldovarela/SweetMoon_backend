const db = require("../db/db.config");

//CREAR USUARIO
exports.create = async (
  nombre,
  apellido,
  direccion,
  fecha_nacimiento,
  telefono
) => {
  const [result] = await db.query(
    `INSERT INTO usuario (nombre, apellido, direccion, fecha_nacimiento, telefono) VALUES (?,?,?,?,?)`,
    [nombre, apellido, direccion, fecha_nacimiento, telefono]
  );
  return result.insertId;
};

// MOSTRAR USUARIO
exports.find = async (id) => {
  const query = "SELECT * FROM usuario WHERE id = ?";
  const [user] = await db.execute(query, [id]);
  return user[0]; // Devuelve el usuario encontrado o `undefined` si no se encuentra
};

//MODIFICAR USUARIO
exports.update = async (id, data) => {
  const { nombre, apellido, direccion, fecha_nacimiento, telefono } = data;
  const sql =
    "UPDATE usuario SET nombre = ?, apellido = ?, direccion = ?, fecha_nacimiento = ?, telefono = ?, WHERE id = ?";
  try {
    const [result] = await db.execute(sql, [
      nombre,
      apellido,
      direccion,
      fecha_nacimiento,
      telefono,
      id,
    ]);
    if (result.affectedRows == 0) {
      throw new Error("Usuario no encontrado para modificacion.");
    }
    const updatedUser = { id, ...data };
    return updatedUser;
  } catch (error) {
    throw new Error("Error al actualizar usuario: " + error.message);
  }
};

// ELIMINAR USUARIO
exports.destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuario WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ error: "El usuario no existe." });
    }
    res.json({ mensaje: `Usuario con id: ${id} eliminado` });
  });
};
