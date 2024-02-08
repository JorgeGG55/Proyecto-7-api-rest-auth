const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Error en el servidor");
};

module.exports = errorHandlerMiddleware;
