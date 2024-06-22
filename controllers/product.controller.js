const db = require("../db/db.config");

// Traer todos los productos
const index = (req, res) => {
  const sql = "SELECT * FROM producto";
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
  const sql = "SELECT * FROM producto WHERE id = ?";
  db.query(sql, [id], (error, fila) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (fila.length == 0) {
      return res.status(404).json({ error: "Producto inexistente." });
    }
    res.json(fila[0]);
  });
};

// Agregar un nuevo producto
const store = (req, res) => {
  const { nombre, precio, stock, categoria_id, urlfoto } = req.body;
  const sql =
    "INSERT INTO producto (nombre, precio, stock, categoria_id, urlfoto) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, precio, stock, categoria_id, urlfoto],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      const producto = { ...req.body, id: result.insertId };
      res.json(producto);
    }
  );
};

// Actualizar un producto por ID
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, categoria_id, urlfoto } = req.body;
  const sql =
    "UPDATE producto SET nombre = ?, precio = ?, stock =?, categoria_id = ?, urlfoto = ? WHERE id = ?";
  db.query(
    sql,
    [nombre, precio, stock, categoria_id, urlfoto, id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ error: "Producto inexistente." });
      }
      const producto = { ...req.body, id: id };
      res.json(producto);
    }
  );
};

// Eliminar un producto por ID
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM producto WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ error: "Producto inexistente." });
    }
    res.json({ mensaje: `Producto con id: ${id} ha sido eliminado` });
  });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
