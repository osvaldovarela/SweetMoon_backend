const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const users = require("../models/users.model");

//creacion nuevo usuario
const register = (req, res) => {
  const { email, password } = req.body;

  const hash = bcrypt.hashSync(password, 8);
  console.log(hash);

  const user = { id: Date.now(), email, password: hash };

  users.push(user);

  console.log(process.env.JWT_EXPIRE);
  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.status(201).send({ auth: true, token });
};

//ingreso de usuario registrado
const login = (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);

  if (!user) return res.status(404).send("Usuario no encontrado.");

  const passwordIsValid = bcrypt.compareSync(password, user.password);

  if (!passwordIsValid) {
    return res.status(401).send({ auth: false, token: null });
  }

  const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });

  res.send({ auth: true, token });
};

module.exports = {
  register,
  login,
};
