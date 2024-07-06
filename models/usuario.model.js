const db = require("../db/db.config");

//traer un usuario segun email
const findOne = async (req, res) => {
  const { email } = req.body;
  const sql = `SELECT * FROM login WHERE email = ?`;

  const [result] = await db.query(sql, [email], (error, fila) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Error de servidor. Intente más tarde." });
    }
    if (fila.length == 0) {
      res.status(404).json({ error: "No se encontró el usuario." });
    }
    res.status(200).json(fila[0]);
  });
};

module.exports = {
  findOne,
};
