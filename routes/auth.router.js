const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.get("/register", (req, res) => {
  res.send(`Hola! Aqui te puedes registrar!`);
});
//endpoint para registrarte /auth/register
router.post("/register", authController.register);

router.get("/login", (req, res) => {
  res.send(`Hola! Aqui te puedes loguear!`);
});
//endpoint para loguearte /auth/login
router.post("/login", authController.login);

router.get("/api", authMiddleware.authMiddleware, (req, res) => {
  res.send(`Hola User ${req.user.id}`);
});

module.exports = router;
