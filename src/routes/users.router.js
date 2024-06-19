const express = require("express");
const router = express.Router();

// El prefijo /productos

//traer todos los usuarios (no deberia)
router.get("/", (req, res) => {
  res.json({ mensaje: "Usuarios cargados" });
});

// traer un usuario
router.get("/:id", (req, res) => {
  console.log(req.params.id);

  const user = users.find((elemento) => elemento.id == req.params.id);
  if (!user) {
    res.status(404).json({ error: "No existe el usuario" });
  } else {
    res.send(producto);
  }
});

//crear un usuario
router.post("/", (req, res) => {
  //   console.log(req.body);

  const producto = {
    id: users.length + 1,
    nombre: req.body.nombre,
    apellido: req.body.stock,
  };

  productos.push(producto);

  res.status(201).send(producto);
});

router.put("/:id", (req, res) => {
  //   console.log(req.params);
  //   console.log(req.body);

  const producto = productos.find((elemento) => elemento.id == req.params.id);
  if (!producto) {
    return res.status(404).json({ error: "No existe el producto" });
  }

  producto.nombre = req.body.nombre;
  producto.stock = req.body.stock;

  res.send(producto);
});

router.delete("/:id", (req, res) => {
  const producto = productos.find((elemento) => elemento.id == req.params.id);
  if (!producto) {
    return res.status(404).json({ error: "No existe el producto" });
  }

  const productoIndex = productos.findIndex(
    (elemento) => elemento.id == req.params.id
  );

  productos.splice(productoIndex, 1);

  res.json(producto);
});

//exporta el router
module.exports = router;
