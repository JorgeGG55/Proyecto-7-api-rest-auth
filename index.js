require("dotenv").config();
const express = require("express");
const usuarioRoutes = require("./src/api/routes/usuario.routes");
const videojuegosRoutes = require("./src/api/routes/videojuego.routes");
const consolasRoutes = require("./src/api/routes/consola.routes");
const errorHandlerMiddleware = require("./src/middlewares/errorHandlerMiddleware");
const { connectDB } = require("./src/config/db");

const app = express();
app.use(express.json());
connectDB();

app.use("/api/usuario", usuarioRoutes);
app.use("/api/videojuegos", videojuegosRoutes);
app.use("/api/consolas", consolasRoutes);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});
