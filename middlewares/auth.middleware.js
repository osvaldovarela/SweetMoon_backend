const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(403).send({ auth: false, message: "Falta token" });

  const token = authHeader.split(" ")[1];

  if (!token)
    return res
      .status(403)
      .send({ auth: false, message: "Token entregado incorrecto." });

  jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
    if (error)
      return res
        .status(500)
        .send({ auth: false, message: "Falló al autenticar el token." });

    req.userId = decoded.id;

    next();
  });
};
