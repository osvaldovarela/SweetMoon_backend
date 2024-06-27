const jwt = require("jsonwebtoken");

//middleware para verificar token
exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader)
    return res.status(403).send({ auth: false, message: "Falta token." });

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

    req.body = decoded;

    next();
  });
};

//middleware para comprobar pertenencia
exports.isOwner = (req, res, next) => {
  const userId = req.params.id;

  if (req.user.id !== parseInt(userId)) {
    return res.status(403).json({ message: "¡Acceso denegado!" });
  }

  next();
};
