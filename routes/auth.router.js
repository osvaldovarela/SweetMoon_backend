const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register", authController.register);
router.post("/login", authController.login);

router.get("/protected", authMiddleware, (req, res) => {
  res.send(`Hola User ${req.userId}`);
});

module.exports = router;
