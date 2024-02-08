const Usuario = require("../models/usuarioModel");
const { hashPassword, comparePassword } = require("../../utils/bcryptUtils");
const generateAuthToken = require("../../utils/tokenUtils");

exports.register = async (req, res) => {
  try {
    const {
      email,
      contraseña,
      nombreUsuario,
      añoNacimiento,
      rol,
      imagenPerfil,
    } = req.body;

    const existingEmail = await Usuario.findOne({ email });
    if (existingEmail) {
      throw new Error("El correo electrónico ya está en uso");
    }

    const existingUser = await Usuario.findOne({ nombreUsuario });
    if (existingUser) {
      throw new Error("El nombre de usuario ya está en uso");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("El formato del correo electrónico es inválido");
    }

    if (contraseña.length < 8) {
      throw new Error("La contraseña debe tener al menos 8 caracteres");
    }

    const currentYear = new Date().getFullYear();
    if (añoNacimiento > currentYear) {
      throw new Error("El año de nacimiento es inválido");
    }

    const hashedPassword = await hashPassword(contraseña);

    const usuario = new Usuario({
      email,
      contraseña: hashedPassword,
      nombreUsuario,
      añoNacimiento,
      rol,
      imagenPerfil,
    });

    await usuario.save();

    const token = generateAuthToken(usuario);

    res.status(201).send({ usuario, token });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, contraseña } = req.body;
    const usuario = await Usuario.findOne({ email });

    if (!usuario) {
      throw new Error("El nombre de usuario es inválido");
    }
    const isMatch = await comparePassword(contraseña, usuario.contraseña);

    if (!isMatch) {
      throw new Error("La contraseña es inválida");
    }
    const token = generateAuthToken(usuario);

    res.send({ usuario, token });
  } catch (error) {
    res.status(401).send({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.usuario.rol !== "admin") {
      if (req.usuario._id.toString() !== id) {
        throw new Error("No tienes permiso para actualizar este usuario");
      }
      if (req.body.rol) {
        throw new Error("No puedes actualizar el atributo de rol");
      }
      delete req.body.rol;
    }
    const usuario = await Usuario.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!usuario) {
      throw new Error("Usuario no encontrado");
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.usuario._id.toString() === id) {
      throw new Error("No puedes eliminarte a ti mismo");
    }

    const usuarioEliminado = await Usuario.findByIdAndDelete(id);

    if (!usuarioEliminado) {
      throw new Error("Usuario no encontrado");
    }

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
