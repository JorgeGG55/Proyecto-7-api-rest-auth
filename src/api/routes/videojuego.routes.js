const express = require("express");
const router = express.Router();
const Videojuego = require("../models/videojuegoModel");

// GET
router.get("/", async (req, res) => {
  try {
    const videojuegos = await Videojuego.find();
    res.json(videojuegos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const videojuego = await Videojuego.findById(req.params.id);
    if (!videojuego) {
      return res.status(404).json({ message: "Videojuego no encontrado" });
    }
    res.json(videojuego);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const videojuego = new Videojuego({
    titulo: req.body.titulo,
    genero: req.body.genero,
    plataforma: req.body.plataforma,
    desarrollador: req.body.desarrollador,
    lanzamiento: req.body.lanzamiento,
  });

  try {
    const nuevoVideojuego = await videojuego.save();
    res.status(201).json(nuevoVideojuego);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const videojuego = await Videojuego.findById(req.params.id);
    if (!videojuego) {
      return res.status(404).json({ message: "Videojuego no encontrado" });
    }

    if (req.body.titulo != null) {
      videojuego.titulo = req.body.titulo;
    }
    if (req.body.genero != null) {
      videojuego.genero = req.body.genero;
    }
    if (req.body.plataforma != null) {
      videojuego.plataforma = req.body.plataforma;
    }
    if (req.body.desarrollador != null) {
      videojuego.desarrollador = req.body.desarrollador;
    }
    if (req.body.lanzamiento != null) {
      videojuego.lanzamiento = req.body.lanzamiento;
    }

    const videojuegoActualizado = await videojuego.save();
    res.json(videojuegoActualizado);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const videojuego = await Videojuego.findById(req.params.id);
    if (!videojuego) {
      return res.status(404).json({ message: "Videojuego no encontrado" });
    }
    await videojuego.remove();
    res.json({ message: "Videojuego eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
