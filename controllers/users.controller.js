const db = require("../db/db.config");

const index = (req, res) => {
  //traer todos los usuarios
  const sql = "SELECT * FROM usuarios";

  db.query(sql, (error, filas) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error en servidor - Intente mas tarde" });
    }

    res.json(filas);
  });
};

const show = (req, res) => {
  const { id } = req.params;

  const sql = "SELECT * FROM usuarios WHERE id = ?";
  db.query(sql, [id], (error, filas) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Intente mas tarde" });
    }

    if (filas.length == 0) {
      return res.status(404).json({ error: "No existe el usuario" });
    }

    res.json(filas[0]);
  });
};

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
          .json({ error: "Error de servidor - Intente mas tarde" });
      }

      const user = { ...req.body, id: result.insertId };

      res.json(user);
    }
  );
};

const update = (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, email, telefono, direccion, username, pass, rol } =
    req.body;

  const sql =
    "UPDATE productos SET nombre = ?, apellido = ? , email = ?, telefono = ?, direccion = ?, username = ?, pass = ?, rol =? WHERE id = ?";
  db.query(
    sql,
    [nombre, apellido, email, telefono, direccion, username, pass, rol, id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Intente mas tarde" });
      }

      if (result.affectedRows == 0) {
        return res.status(404).json({ error: "No existe el usuario" });
      }

      const user = { ...req.body, ...req.params };

      res.json(user);
    }
  );
};

const destroy = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM usuarios WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Intente mas tarde" });
    }

    if (result.affectedRows == 0) {
      return res.status(404).json({ error: "No existe el usuario" });
    }

    res.json({ mensaje: `Usuario ${id} eliminado` });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
