const db = require("../db/db.config");

// Traer todos los productos
const readAll = (req, res) => {
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
const readOne = (req, res) => {
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
const create = (req, res) => {
  const { nombre, precio, stock, urlfoto, categoria_id } = req.body;
  const sql =
    "INSERT INTO producto (nombre, precio, stock, urlfoto, categoria_id) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, precio, stock, urlfoto, categoria_id],
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
const updateOne = (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, urlfoto, categoria_id } = req.body;
  const sql =
    "UPDATE producto SET nombre = ?, precio = ?, stock = ?, urlfoto = ?, categoria_id = ? WHERE id = ?";
  db.query(
    sql,
    [nombre, precio, stock, urlfoto, categoria_id, id],
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
const deleteOne = (req, res) => {
  const { id } = req.params || {};
  console.log("id: ", id);

  if (!id) {
    return res
      .status(400)
      .json({ error: "Id no recibido. Ingrese un Id válido" });
  }

  const sql = `DELETE FROM producto WHERE id = ?`;

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
  readAll,
  readOne,
  create,
  updateOne,
  deleteOne,
};
