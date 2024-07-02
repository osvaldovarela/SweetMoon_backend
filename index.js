require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.disable("x-powered-bi");
const bodyParser = require("body-parser");

//origenes permitidos
const whiteList = [
  "http://localhost:8080",
  "https://osvaldovarela.github.io/tienda_SweetMoon",
];

// Opciones de configuración para el middleware CORS
const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};
// Aplicar el middleware CORS a todas las rutas
app.use(cors(corsOpts));

const productRouter = require("./routes/products.router");
const userRouter = require("./routes/users.router");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", productRouter);
app.use("/usuarios", userRouter);

app.get("/", (req, res) => {
  res.send("Bienvenida/o a Tienda SweetMoon!!");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`https://sweet-moon-backend.vercel.app/`));
