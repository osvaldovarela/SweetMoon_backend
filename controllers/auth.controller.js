const db = require("../db/db.config");
const express = require("express");
const app = express();
const Usuario = require("../models/usuario.model");

const login = async (req, res) => {
  const { email, contraseña } = req.body;
  try {
    //verificar existencia email
    const usuario = await Usuario.findOne({ email });
    //verificar usuario activo?

    //verificar contraseña

    //generar token

    res.json({ msg: "Login ok", email, contraseña });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error de servidor. Intente más tarde." });
  }
};

module.exports = {
  login,
};
