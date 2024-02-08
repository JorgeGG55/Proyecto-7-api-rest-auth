const jwt = require("jsonwebtoken");
const Usuario = require("../api/models/usuarioModel");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      throw new Error("Token de autenticación no proporcionado");
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);
    const usuario = await Usuario.findOne({ _id: data._id });
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    req.usuario = usuario;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Autenticación requerida" });
  }
};

const isUser = (req, res, next) => {
  if (req.usuario && req.usuario.rol === "user") {
    next();
  } else {
    res.status(403).send({ error: "Acceso no autorizado" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === "admin") {
    next();
  } else {
    res.status(403).send({ error: "Acceso no autorizado" });
  }
};

module.exports = { authMiddleware, isUser, isAdmin };
