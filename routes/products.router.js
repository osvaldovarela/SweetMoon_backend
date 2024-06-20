const express = require("express");
const router = express.Router();
const productosController = require("../controllers/product.controller");

router.get("/", productosController.index);
router.get("/:id", productosController.show);
router.post("/", productosController.store);
router.put("/:id", productosController.update);
router.delete("/:id", productosController.destroy);

module.exports = router;
