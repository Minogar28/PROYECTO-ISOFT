const constants = require('../../constants');
const { v1: uuidv1 } = require('uuid');
const mongo = require('mongodb');
const tareasModel = require('../../models/tareas'); // Modelo de Tareas

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date().getTime(),
  nsecs: 5678,
};

uuidv1(v1options);

const repo = {
  listar: async () => {
    try {
      const response = await tareasModel.find().sort('fechaDeCreacion'); // Ordenar por fecha de creación
      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "OK", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al listar las tareas",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  buscar: async ({ findObject }) => {
    try {
      const query = { [findObject.key]: findObject.value };
      const response = await tareasModel.find(query).sort('fechaDeCreacion');
      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "OK", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al buscar la tarea",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  insertar: async (tareaData) => {
    try {
      const fechaDeCreacion = new Date().toISOString(); // Fecha ISO para consistencia
      const tarea = { ...tareaData, fechaDeCreacion };
      const response = await tareasModel.create(tarea);
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.FAILED_MESSAGE;
      return { status, mensaje: "Tarea creada correctamente", datos: [response] };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al crear la tarea",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  actualizar: async (tareaData) => {
    try {
      const filtro = { _id: tareaData._id };
      const response = await tareasModel.findOneAndUpdate(filtro, tareaData, { new: true });
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
      const mensaje = response ? "Tarea actualizada correctamente" : "Tarea no encontrada";
      return { status, mensaje, datos: response ? [response] : [] };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al actualizar la tarea",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  eliminar: async (tareaData) => {
    try {
      const filtro = { _id: tareaData._id };
      const response = await tareasModel.findOneAndRemove(filtro);
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
      const mensaje = response ? "Tarea eliminada correctamente" : "Tarea no encontrada";
      return { status, mensaje, datos: response ? [response] : [] };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al eliminar la tarea",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  consultar: async ({ findObject }) => {
    try {
      const query = findObject.search
        ? {
            $or: [
              { nombreTarea: { $regex: findObject.search, $options: 'i' } },
              { descripcion: { $regex: findObject.search, $options: 'i' } },
            ],
          }
        : {};

      const response = await tareasModel.aggregate([
        { $match: query },
        { $sort: { fechaDeCreacion: -1 } },
      ]);

      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "OK", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al consultar las tareas",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },
};

module.exports = repo;
