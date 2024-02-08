const express = require("express");
const router = express.Router();
const Consola = require("../models/consolaModel");
const {
  authMiddleware,
  isUser,
  isAdmin,
} = require("../../middlewares/authMiddleware");

// GET
router.get("/", async (req, res) => {
  try {
    const consolas = await Consola.find();
    res.json(consolas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET BY ID
router.get("/:id", async (req, res) => {
  try {
    const consola = await Consola.findById(req.params.id);
    if (!consola) {
      return res.status(404).json({ message: "Consola no encontrada" });
    }
    res.json(consola);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST
router.post("/", async (req, res) => {
  const consola = new Consola({
    nombre: req.body.nombre,
    fabricante: req.body.fabricante,
    lanzamiento: req.body.lanzamiento,
    videojuegosPopulares: req.body.videojuegosPopulares || [],
  });

  try {
    const nuevaConsola = await consola.save();
    res.status(201).json(nuevaConsola);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH
router.patch("/:id", async (req, res) => {
  try {
    const consola = await Consola.findById(req.params.id);
    if (!consola) {
      return res.status(404).json({ message: "Consola no encontrada" });
    }

    if (req.body.nombre != null) {
      consola.nombre = req.body.nombre;
    }
    if (req.body.fabricante != null) {
      consola.fabricante = req.body.fabricante;
    }
    if (req.body.lanzamiento != null) {
      consola.lanzamiento = req.body.lanzamiento;
    }
    if (req.body.videojuegosPopulares != null) {
      consola.videojuegosPopulares = req.body.videojuegosPopulares;
    }

    const consolaActualizada = await consola.save();
    res.json(consolaActualizada);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE
router.delete("/:id", authMiddleware, isAdmin, async (req, res) => {
  try {
    const consola = await Consola.findById(req.params.id);
    if (!consola) {
      return res.status(404).json({ message: "Consola no encontrada" });
    }
    await Consola.deleteOne({ _id: req.params.id });
    res.json({ message: "Consola eliminada" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
