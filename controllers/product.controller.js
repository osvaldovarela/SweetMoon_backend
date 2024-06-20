const db = require("../db/db.config");
//traer todos los productos
const index = (req, res) => {
  const sql = "SELECT * FROM productos";
  db.query(sql, (error, fila) => {
    if (error) {
      return res.status(500).json({ error: "Intente mas tarde" });
    }

    res.json(fila);
  });
};

//traer un producto
const show = (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM productos WHERE id = ?";
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

//agregar un nuevo producto
const store = (req, res) => {
  const { nombre, descripcion, precio, categoria, urlfoto } = req.body;

  const sql =
    "INSERT INTO productos (nombre, descripcion,precio, categoria, urlfoto) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, descripcion, precio, categoria, urlfoto],
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

//actualiza un producto
const update = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, categoria, urlfoto } = req.body;

  const sql =
    "UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, categoria = ?, urlfoto = ? WHERE id = ?";
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

      const producto = { ...req.body, ...req.params };

      res.json(producto);
    }
  );
};

//eliminar producto
const destroy = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM productos WHERE id = ?";
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
