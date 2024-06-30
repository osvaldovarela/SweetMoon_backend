require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();

app.disable("x-powered-bi");
const bodyParser = require("body-parser");

const productRouter = require("./routes/products.router");
const userRouter = require("./routes/users.router");
const authRouter = require("./routes/auth.router");

// Middleware para parsear el cuerpo de las peticiones
const corsOptions = {
  origin: "https://osvaldovarela.github.io/tienda_SweetMoon/", // URL del frontend que permites (puedes usar * para permitir cualquier origen)
  methods: ["GET", "POST", "PUT", "DELETE"], // Métodos HTTP permitidos
  allowedHeaders: ["Content-Type", "Authorization"], // Encabezados permitidos
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//ruta para pedidos
app.use("/productos", productRouter);
//ruta para registrarse y loguearse
app.use("/auth", authRouter);

//deberia acceder con permisos
//rutas para CRUD
app.use("/api", userRouter);

app.get("/", (req, res) => {
  res.send("Bienvenida/o a Tienda SweetMoon!!");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () =>
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
);
