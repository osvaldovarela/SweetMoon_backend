const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.get("/", usersController.readAll);
router.get("/:id", usersController.readOne);
router.post("/", usersController.create);
router.put("/:id", usersController.updateOne);
router.delete("/:id", usersController.deleteOne);

module.exports = router;
