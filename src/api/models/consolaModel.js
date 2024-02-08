const mongoose = require("mongoose");

const consolaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fabricante: { type: String, required: true },
  lanzamiento: { type: Date, required: true },
  videojuegosPopulares: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Videojuego" },
  ],
});

module.exports = mongoose.model("Consola", consolaSchema);
