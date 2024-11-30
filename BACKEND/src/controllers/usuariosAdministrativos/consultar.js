const repository = require('../../repositories/usuariosAdministrativos');
const constants = require('../../constants');

async function handler(req, res, next) {
  try {
    const findObject = {
      search: req.query.search, // Obtener el valor desde el query string
    };

    const response = await repository.consultar({ findObject });

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

    // Construir el objeto de respuesta
    let oResponse = {
      datos: response.datos,
      Error: false,
      Mensaje: "OK",
    };

    if (statusCode !== 200) {
      oResponse.status = response.status;
      oResponse.code = response.failure_code;
      oResponse.Error = true;
      oResponse.Mensaje = response.failure_message;
    }

    res.status(statusCode).send(oResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = handler;
