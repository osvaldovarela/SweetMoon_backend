require("dotenv").config();
const express = require("express");

const app = express();
app.disable("x-powered-bi");
const usersRouter = require("./src/routes/users.router");

app.use(express.json());
app.use("/users", usersRouter);

// app.get("/", (res, req) => {
//   res.json({ message: "hola mundo" });
// });

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`server listening in port http://localhost:${PORT}`);
});
