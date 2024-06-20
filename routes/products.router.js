const express = require("express");
const router = express.Router();
const productos = require("../controllers/product.controller");

//traer todos los productos
router.get("/", (req, res) => {
  res.json({ mensaje: "Productos cargados" });
});

// traer un producto s/ id
router.get("/:id", (req, res) => {
  console.log(req.params.id);

  const product = productos.find((elemento) => elemento.id == req.params.id);
  if (!product) {
    res.status(404).json({ error: "No existe el producto" });
  } else {
    res.send(product);
  }
});

//crear un producto
router.post("/", (req, res) => {
  //   console.log(req.body);

  const product = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    categoria: req.body.categoria,
    precio: req.body.precio,
  };

  productos.push(product);

  res.status(201).send(product);
});

router.put("/:id", (req, res) => {
  //   console.log(req.params);
  //   console.log(req.body);

  const product = productos.find((elemento) => elemento.id == req.params.id);
  if (!product) {
    return res.status(404).json({ error: "No existe el producto" });
  }

  (product.nombre = req.body.nombre),
    (product.descripcion = req.body.descripcion),
    (product.categoria = req.body.categoria),
    (product.precio = req.body.precio),
    res.send(product);
});

router.delete("/:id", (req, res) => {
  const product = productos.find((elemento) => elemento.id == req.params.id);
  if (!product) {
    return res.status(404).json({ error: "No existe el producto" });
  }

  const productoIndex = productos.findIndex(
    (elemento) => elemento.id == req.params.id
  );

  productos.splice(productoIndex, 1);

  res.json(product);
});

//exporta el router
module.exports = router;
