const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
const authController = require("../controllers/auth.controller");
//importa middlewares para verificar token y pertenencia
const { authMiddleware, isOwner } = require("../middlewares/auth.middleware");

// router.get("/", authMiddleware, isOwner, usersController.index);
router.get("/:id", authMiddleware, isOwner, usersController.find);
router.post("/", authController.register);
router.put("/:id", authMiddleware, isOwner, usersController.update);
router.delete("/:id", authMiddleware, isOwner, usersController.destroy);

module.exports = router;
