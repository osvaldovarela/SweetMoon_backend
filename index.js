require("dotenv").config();

const express = require("express");
const app = express();
app.disable("x-powered-bi");
const bodyParser = require("body-parser");
const productRouter = require("./routes/product.router"); // Ajusta la ruta según tu estructura

// Middleware para parsear el cuerpo de las peticiones
app.use(bodyParser.json());

// Usar el router de productos
app.use("/productos", productRouter);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
