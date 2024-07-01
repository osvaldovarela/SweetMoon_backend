const db = require("../db/db.config");

// Traer todos los productos
const readAll = (req, res) => {
  const sql = `SELECT * FROM usuario JOIN login ON usuario.id = login.usuario_id;`;
  db.query(sql, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    res.json(result);
  });
};

// Traer un producto por ID
const readOne = (req, res) => {
  const { id } = req.params;

  const sql = `SELECT usuario.*, login.* 
              FROM usuario 
              INNER JOIN login
              ON usuario.id = login.usuario_id
              WHERE usuario.id = ?
              LIMIT 1;`;
  db.query(sql, [id], (error, fila) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (fila.length == 0) {
      return res.status(404).json({ error: "El usuario no existe." });
    }
    res.json(fila[0]);
  });
};

// Agregar un nuevo producto
const create = (req, res) => {
  const {
    nombre,
    apellido,
    direccion,
    fecha_nacimiento,
    telefono,
    email,
    contraseña,
  } = req.body;

  db.query("START TRANSACTION", (err) => {
    if (err) {
      return res.status(500).json({ error: "Error al iniciar transacción" });
    }

    const sqlUsuario = `INSERT INTO usuario (nombre, apellido, direccion, fecha_nacimiento, telefono)
                        VALUES (?,?,?,?,?);`;
    db.query(
      sqlUsuario,
      [nombre, apellido, direccion, fecha_nacimiento, telefono],
      (err, result) => {
        if (err) {
          db.query("ROLLBACK");
          return res.status(500).json({ error: "Error al crear usuario" });
        }
        console.log("id: ", result.insertId);
        const usuario_id = result.insertId;
        //carga login segun id usuario
        const sqlLogin = `INSERT INTO login (email, contraseña, usuario_id) VALUES (?,?,?);`;
        db.query(sqlLogin, [email, contraseña, usuario_id], (err) => {
          console.log("error: ", err);
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              db.query("ROLLBACK");
              return res
                .status(400)
                .json({ error: "El correo electrónico ya existe" });
            }
            db.query("ROLLBACK");
            return res.status(500).json({ error: "Error al crear login" });
          }

          db.query("COMMIT");
          const userData = {
            id: usuario_id,
            nombre,
            apellido,
            direccion,
            fecha_nacimiento,
            telefono,
            email,
            contraseña,
          };
          console.log(userData);

          return res
            .status(201)
            .json({ message: "Usuario creado correctamente", user: userData });
        });
      }
    );
  });
};

// Actualizar un usuario por ID
const updateOne = (req, res) => {
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
  const sql = `UPDATE usuario
              JOIN login ON usuario.id = login.usuario_id
              SET usuario.nombre = ?, usuario.apellido = ?, usuario.direccion = ?, usuario.fecha_nacimiento = ?, usuario.telefono = ?,
              login.email = ?, login.contraseña = ?
              WHERE usuario.id = ?`;
  db.query(
    sql,
    [
      nombre,
      apellido,
      direccion,
      fecha_nacimiento,
      telefono,
      email,
      contraseña,
      id,
    ],
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "Error de servidor - Pruebe más tarde" });
      }
      //si no encuentra filas que coincidan
      if (result.affectedRows == 0) {
        return res.status(404).json({ error: "Usuario no existe." });
      }
      const user = { ...req.body, id: id };
      res.json(user);
    }
  );
};

// Eliminar un producto por ID
const deleteOne = (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM usuario WHERE id = ?";
  db.query(sql, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "Error de servidor - Pruebe más tarde" });
    }
    if (result.affectedRows == 0) {
      return res.status(404).json({ error: "El usuario no existe." });
    }
    res.json({ mensaje: `Usuario con id: ${id} eliminado` });
  });
};

module.exports = {
  readAll,
  readOne,
  create,
  updateOne,
  deleteOne,
};
