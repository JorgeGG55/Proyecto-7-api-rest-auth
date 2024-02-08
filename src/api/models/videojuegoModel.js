const mongoose = require("mongoose");

const videojuegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  desarrollador: { type: String, required: true },
  lanzamiento: { type: Date, required: true },
});

module.exports = mongoose.model("Videojuego", videojuegoSchema);
