const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const {
  authMiddleware,
  isUser,
  isAdmin,
} = require("../../middlewares/authMiddleware");

router.post("/register", usuarioController.register);
router.post("/login", usuarioController.login);
router.patch("/:id", authMiddleware, usuarioController.updateUser);
router.delete("/:id", authMiddleware, isAdmin, usuarioController.deleteUser);
router.get("/ruta-protegida", authMiddleware, (req, res) => {
  res.send("Ruta protegida, usuario autenticado");
});

module.exports = router;
