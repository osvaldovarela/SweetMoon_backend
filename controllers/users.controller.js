const userModel = require("../models/userModel");
const { hashPassword } = require("../utils/hashPassword");

exports.find = async (req, res) => {
  const { id } = req.params;

  try {
    await userModel.find(id);
    res.status(200).json({});
  } catch (error) {
    res
      .status(500)
      .json({ message: "¡Error: No se pudo eliminar el usuario!", error });
  }
};

exports.update = async (req, res) => {
  const { id } = req.params;
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
    let hash;
    if (contraseña) {
      hash = await hashPassword(contraseña);
    }

    await userModel.update(
      id,
      nombre,
      apellido,
      direccion,
      fecha_nacimiento,
      telefono,
      email,
      contraseña
    );
    res.status(200).json({ message: "Usuario modificado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al modificar usuario", error });
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
