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
exports.find = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM usuario WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ error: "El usuario no existe." });
    }
    const user = { ...req.body, id: id };
    res.json(user);
  });
};

//MODIFICAR USUARIO
exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, fecha_nacimiento, telefono, email } =
    req.body;
  const sql =
    "UPDATE usuario SET nombre = ?, apellido = ?, direccion = ?, fecha_nacimiento = ?, telefono = ?, WHERE id = ?";
  db.query(
    sql,
    [nombre, apellido, direccion, fecha_nacimiento, telefono, email, id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ error: "Usuario no existe." });
      }
      const user = { ...req.body, id: id };
      res.json(user);
    }
  );
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
