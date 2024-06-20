require("dotenv").config();

const express = require("express");
const app = express();
app.disable("x-powered-bi");
const bodyParser = require("body-parser");
const productRouter = require("./routes/products.router");
const userRouter = require("./routes/users.router");

// Middleware para parsear el cuerpo de las peticiones
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Usar el router de productos
app.use("/productos", productRouter);
app.use("/usuarios", userRouter);

app.get("/", (req, res) => {
  res.send("hola mundo");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
