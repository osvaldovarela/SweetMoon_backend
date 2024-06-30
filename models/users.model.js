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
  const sql = "SELECT * FROM usuario WHERE id = ?";
  const [usuarios] = await db.query(sql, [id]);
  return usuarios[0]; // Devuelve el usuario encontrado o `undefined` si no se encuentra
};

//MODIFICAR USUARIO
exports.update = async (id, data) => {
  const { nombre, apellido, direccion, fecha_nacimiento, telefono } = data;
  const sql =
    "UPDATE usuario SET nombre = ?, apellido = ?, direccion = ?, fecha_nacimiento = ?, telefono = ? WHERE id = ?";
  try {
    const [result] = await db.query(sql, [
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
exports.destroy = async (id) => {
  const sql = "DELETE FROM usuario WHERE id = ?";
  const result = await db.query(sql, [id]);
  if (result.affectedRows == 0) {
    throw new Error(".Usuario no encontrado. Nada se ha eliminado");
  }
  return { mensaje: `Usuario con id ${id} eliminado!` };
};
