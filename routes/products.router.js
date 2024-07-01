const express = require("express");
const router = express.Router();
const productosController = require("../controllers/product.controller");

router.get("/", productosController.readAll);
router.get("/:id", productosController.readOne);
router.post("/", productosController.create);
router.put("/:id", productosController.updateOne);
router.delete("/:id", productosController.deleteOne);

module.exports = router;
