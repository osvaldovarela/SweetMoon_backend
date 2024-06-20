const db = require("../db/db.config");

// Traer todos los productos
const index = (req, res) => {
  const sql = "SELECT * FROM usuarios";
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

  const sql = "SELECT * FROM usuarios WHERE idusuario = ?";
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
  const { nombre, apellido, email, telefono, direccion, username, pass, rol } =
    req.body;
  const sql =
    "INSERT INTO usuarios (nombre, apellido, email, telefono, direccion, username, pass, rol) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, apellido, email, telefono, direccion, username, pass, rol],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      const user = { ...req.body, idusuario: result.insertId };
      res.json(user);
    }
  );
};

// Actualizar un producto por ID
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, direccion, username, pass, rol } =
    req.body;
  const sql =
    "UPDATE usuarios SET nombre = ?, apellido = ?, email = ?, telefono = ?, direccion = ?, username = ?, pass = ?, rol = ? WHERE idusuario = ?";
  db.query(
    sql,
    [nombre, apellido, email, telefono, direccion, username, pass, rol, id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ error: "Usuario no existe." });
      }
      const user = { ...req.body, idusuario: id };
      res.json(user);
    }
  );
};

// Eliminar un producto por ID
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuarios WHERE idusuario = ?";
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
