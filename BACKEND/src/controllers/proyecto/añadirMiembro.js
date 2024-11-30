const repo = require("../../repositories/proyecto");
const constants = require('../../constants');

async function añadirMiembroHandler(req, res, next) {
  try {
    const { nombreProyecto, codigoInvitacion, miembro } = req.body;

    if (!nombreProyecto && !codigoInvitacion) {
      return res.status(400).json({
        status: "error",
        mensaje: "Debe proporcionar el nombre del proyecto o el código de invitación",
      });
    }

    const response = await repo.añadirMiembro(nombreProyecto, codigoInvitacion, miembro);

    if (response.status === constants.SUCCEEDED_MESSAGE) {
      return res.status(200).json(response);
    }

    const statusCode = response.status === constants.NOT_FOUND_ERROR_MESSAGE ? 404 : 400;
    return res.status(statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = añadirMiembroHandler;
