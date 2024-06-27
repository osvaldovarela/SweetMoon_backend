const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");
//importa middlewares para verificar token y pertenencia
const authMiddleware = require("../middlewares/auth.middleware");
const isOwner = require("../middlewares/auth.middleware");

// router.get("/", authMiddleware, isOwner, usersController.index);
router.get("/:id", authMiddleware, isOwner, usersController.show);
// router.post("/", authMiddleware, usersController.store);
router.put("/:id", authMiddleware, isOwner, usersController.update);
router.delete("/:id", authMiddleware, isOwner, usersController.destroy);

module.exports = router;
