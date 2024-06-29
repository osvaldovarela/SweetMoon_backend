const db = require("../db/db.config");

exports.cargarLogin = async (email, contraseña, usuario_id) => {
  await db.query(
    `INSERT INTO login (email, contraseña, usuario_id) VALUES (?, ?, ?)`,
    [email, contraseña, usuario_id],
    (error, result, fields) => {
      if (error) {
        if (error.code === "ER_DUP_ENTRY") {
          //aqui el manejo del error de email ya en uso
          console.log("Error: El email ya está en uso.");
        } else {
          console.log("Error en la consulta: ", error);
        }
      } else {
        console.log("Usuario registrado exitosamente." + fields);
        console.log(result);
      }
    }
  );
};

exports.updateLogin = async (req, res) => {
  const idUser = req.params;
  const { email, contraseña } = req.body;

  const sql = "UPDATE login SET email = ?, contraseña = ? WHERE usuario_id = ?";
};
