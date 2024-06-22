const db = require("../db/db.config");

// Traer todos los productos
const index = (req, res) => {
  const sql = "SELECT * FROM usuario";
  db.query(sql, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    res.json(result);
  });
};

// Traer un producto por ID
const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM usuario WHERE id = ?";
  db.query(sql, [id], (error, fila) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (fila.length == 0) {
      return res.status(404).json({ error: "El usuario no existe." });
    }
    res.json(fila[0]);
  });
};

// Agregar un nuevo producto
const store = (req, res) => {
  const { nombre, apellido, direccion, fecha_nacimiento, telefono, email } =
    req.body;
  const sql =
    "INSERT INTO usuario (nombre, apellido, direccion, fecha_nacimiento, telefono, email) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, apellido, direccion, fecha_nacimiento, telefono, email],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      const user = { ...req.body, id: result.insertId };
      res.json(user);
    }
  );
};

// Actualizar un producto por ID
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, direccion, fecha_nacimiento, telefono, email } =
    req.body;
  const sql =
    "UPDATE usuario SET nombre = ?, apellido = ?, direccion = ?, fecha_nacimiento = ?, telefono = ?, email = ?  WHERE idusuario = ?";
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

// Eliminar un producto por ID
const destroy = (req, res) => {
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

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
