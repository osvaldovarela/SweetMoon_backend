const db = require("../db/db.config");

// Traer todos los productos
const index = (req, res) => {
  const sql = "SELECT * FROM productos";
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

  const sql = "SELECT * FROM productos WHERE idproducto = ?";
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
  const { nombre, descripcion, precio, categoria, urlfoto } = req.body;
  const sql =
    "INSERT INTO productos (nombre, descripcion, precio, categoria, urlfoto) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, descripcion, precio, categoria, urlfoto],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      const producto = { ...req.body, idproducto: result.insertId };
      res.json(producto);
    }
  );
};

// Actualizar un producto por ID
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, urlfoto } = req.body;
  const sql =
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, urlfoto = ? WHERE idproducto = ?";
  db.query(
    sql,
    [nombre, descripcion, precio, categoria, urlfoto, id],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      if (result.affectedRows == 0) {
        return res.status(404).json({ error: "Producto inexistente." });
      }
      const producto = { ...req.body, idproducto: id };
      res.json(producto);
    }
  );
};

// Eliminar un producto por ID
const destroy = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM productos WHERE idproducto = ?";
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
