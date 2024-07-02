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

const productRouter = require("./routes/products.router");
const userRouter = require("./routes/users.router");

// Opciones de configuración para el middleware CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Verificar si el origen de la solicitud está en la lista blanca
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true); // Permitir solicitud
    } else {
      callback(new Error("Not allowed by CORS")); // Denegar solicitud
    }
  },
  credentials: true, // Habilitar el envío de cookies},
};

// Aplicar el middleware CORS a todas las rutas
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/productos", productRouter);
app.use("/usuarios", userRouter);

app.get("/", (req, res) => {
  res.send("Bienvenida/o a Tienda SweetMoon!!");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => console.log(`https://sweet-moon-backend.vercel.app/`));
