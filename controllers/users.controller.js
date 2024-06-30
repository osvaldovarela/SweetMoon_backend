const userModel = require("../models/users.model");
const loginModel = require("../models/login.model");
const bcrypt = require("bcryptjs");
// const { hashPassword } = require("../node_modules/");

exports.find = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.find(id);
    const login = await loginModel.find(id);
    if (user && login) {
      res.status(200).json({ message: "Usuario encontrado", user });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al buscar el usuario", error });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.find(id);
  if (!user) {
    res.status(404).json({ message: "Usuario no encontrado" });
  } else {
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
      await userModel.update(
        id,
        nombre,
        apellido,
        direccion,
        fecha_nacimiento,
        telefono
      );
      if (contraseña) {
        const hash = bcrypt.hashSync(contraseña, 8);
        await loginModel.updateLogin(id, email, hash);
      }

      res.status(200).json({ message: "Usuario modificado correctamente." });
    } catch (error) {
      res.status(500).json({ message: "Error al modificar usuario", error });
    }
  }
};

exports.destroy = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.destroy(id);
    res.status(200).json({ message: "¡Usuario eliminado!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "¡Error: No se pudo eliminar el usuario!", error });
  }
};
