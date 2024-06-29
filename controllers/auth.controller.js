const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userModel = require("../models/users.model");
const loginModel = require("../models/login.model");

//creacion nuevo usuario
const register = async (req, res) => {
  const {
    nombre,
    apellido,
    direccion,
    fecha_nacimiento,
    telefono,
    email,
    contraseña,
  } = req.body;
  try {
    await db.beginTransaction();

    const usuario_id = await userModel.create(
      nombre,
      apellido,
      direccion,
      fecha_nacimiento,
      telefono
    );
    const hash = bcrypt.hashSync(contraseña, 8);
    console.log(hash);

    //para ver si trae el valor que habia guardado
    console.log(process.env.JWT_EXPIRE);
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    //llamada al metodo para insertar al login
    await loginModel.cargarLogin(email, hash, usuario_id);

    //commit del cambio a la bd
    await db.commit();

    res
      .status(201)
      .json({ auth: true, message: "Usuario registrado exitosamente", token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

//ingreso de usuario registrado
const login = (req, res) => {
  const { email, password } = req.body;

  const user = userModel.find((u) => u.email === email);

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
