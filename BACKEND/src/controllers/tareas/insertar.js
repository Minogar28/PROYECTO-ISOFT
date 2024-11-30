const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const tareasRepository = require('../../repositories/tareas');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {
    const objTarea = req.body;

    // Call the insert function
    const response = await tareasRepository.insertar(objTarea);

    // Set status code
    let statusCode;
    switch (response.status) {
      case constants.INTERNAL_ERROR_MESSAGE:
        statusCode = 500;
        break;
      default:
        statusCode = 200;
    }

    // Prepare the response object
    const oResponse = {
      datos: response.datos,
      Error: response.status !== constants.SUCCEEDED_MESSAGE,
      Mensaje: response.status === constants.SUCCEEDED_MESSAGE ? "Tarea creada correctamente" : response.failure_message,
    };

    res.status(statusCode).send(oResponse);
  } catch (error) {
    next(error);
  }
}

module.exports = [validate, handler];
