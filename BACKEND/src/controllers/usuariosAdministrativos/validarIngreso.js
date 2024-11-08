const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const usuariosRepository = require('../../repositories/usuariosAdministrativos');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
    try {
        let findObject = req.body;
        let arrRoles = [];
        
        // Ejecuta la búsqueda en el repositorio
        let response = await usuariosRepository.validarIngreso2(findObject);
        console.log("Respuesta que analizo", response);
        
        // Inicializa `response.usuarios` como un array vacío si no es un array o no tiene elementos
        response.usuarios = Array.isArray(response.usuarios) ? response.usuarios : [];
        
        // Determina el código de estado de la respuesta
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

        // Objeto de respuesta
        let oResponse = {
            Datos: response.datos,
            DatosKey: response.datosKey,
            token: response.token
        };

        // Si hay un error, añade detalles de error a la respuesta
        if (statusCode !== 200) {
            oResponse.status = response.status;
            oResponse.error = {
                code: response.failure_code,
                message: response.failure_message
            };
        }

        res.status(statusCode).send(oResponse);
    } catch (error) {
        next(error);
    }
}

module.exports = [validate, handler];
