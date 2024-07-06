const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const { route } = require("./products.router");

router.get("/login", authController);
router.post("/login", authController);
