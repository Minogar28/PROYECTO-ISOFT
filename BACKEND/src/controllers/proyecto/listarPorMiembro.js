const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema'); // Si necesitas validar inputs adicionales
const repository = require('../../repositories/proyecto');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function listarPorMiembroHandler(req, res, next) {
  try {
    // Obtener miembroId desde query o body
    const miembroId = req.query.miembro || req.body.miembro;

    // Validar que miembroId no esté vacío
    if (!miembroId) {
      return res.status(400).send({
        datos: [],
        Error: true,
        Mensaje: "El ID del miembro es obligatorio",
      });
    }

    console.log("ID del miembro recibido:", miembroId);

    // Llamar a la función listarPorMiembro en el repositorio
    const response = await repository.listarPorMiembro(miembroId);

    // Determinar el código de estado
    let statusCode;
    switch (response.status) {
      case constants.NOT_FOUND_ERROR_MESSAGE:
        statusCode = 404;
        break;
      case constants.INTERNAL_ERROR_MESSAGE:
        statusCode = 500;
        break;
      default:
        statusCode = 200;
    }

    // Construir la respuesta
    let oResponse = {
      datos: response.datos,
      Error: false,
      Mensaje: response.mensaje || "OK",
    };

    if (statusCode !== 200) {
      oResponse.status = response.status;
      oResponse.code = response.failure_code || null;
      oResponse.Error = true;
      oResponse.Mensaje = response.failure_message || "Error desconocido";
    }

    // Enviar la respuesta con el código de estado adecuado
    res.status(statusCode).send(oResponse);

  } catch (error) {
    console.error("Error en listarPorMiembroHandler:", error);
    next(error); // Pasar el error al middleware de gestión de errores
  }
}

module.exports = [validate, listarPorMiembroHandler];
