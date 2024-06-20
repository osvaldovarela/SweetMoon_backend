const express = require("express");
const router = express.Router();
const usuarios = require("../controllers/users.controller");

//traer todos los usuarios (no deberia)
router.get("/", (req, res) => {
  res.json({ mensaje: "Usuarios cargados" });
  res.send(usuarios);
});

// traer un usuario
router.get("/:id", (req, res) => {
  console.log(req.params.id);

  const user = usuarios.find((elemento) => elemento.id == req.params.id);
  if (!user) {
    res.status(404).json({ error: "No existe el usuario" });
  } else {
    res.send(user);
  }
});

//crear un usuario
router.post("/", (req, res) => {
  //   console.log(req.body);

  const user = {
    id: usuarios.length + 1,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    telefono: req.body.telefono,
    direccion: req.body.direccion,
    username: req.body.username,
    pass: req.body.pass,
    rol: req.body.rol,
  };

  usuarios.push(user);

  res.status(201).send(user);
});

//actualizacion de perfil de usuario

router.put("/:id", (req, res) => {
  //   console.log(req.params);
  //   console.log(req.body);

  const user = usuarios.find((elemento) => elemento.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "No existe el usuario" });
  }

  (user.nombre = req.body.nombre),
    (user.apellido = req.body.apellido),
    (user.email = req.body.email),
    (user.telefono = req.body.telefono),
    (user.direccion = req.body.direccion),
    (user.username = req.body.username),
    (user.pass = req.body.pass),
    (user.rol = req.body.rol),
    res.send(user);
});

//eliminar usuario
//debe implementarse solo cuando se esta logueado y unicamente el usuario con id == al logueado
router.delete("/:id", (req, res) => {
  const user = usuarios.find((elemento) => elemento.id == req.params.id);
  if (!user) {
    return res.status(404).json({ error: "No existe el usuario" });
  }

  const userIndex = usuarios.findIndex(
    (elemento) => elemento.id == req.params.id
  );

  productos.splice(userIndex, 1);
  res.json(user);
});

//exporta el router
module.exports = router;
