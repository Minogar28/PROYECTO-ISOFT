const constants = require('../../constants');
const { v1: uuidv1 } = require('uuid');
const mongo = require('mongodb');
const objModel = require('../../models/proyecto'); // Modelo del proyecto

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
      const response = await objModel.find().sort('nombreProyecto'); // Ordenar por nombre del proyecto
      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "OK", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al listar los proyectos",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  buscar: async ({ findObject }) => {
    try {
      const query = { [findObject.key]: findObject.value };
      const response = await objModel.find(query).sort('nombreProyecto');
      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "OK", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al buscar el proyecto",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  insertar: async (proyectoData) => {
    try {
      const fechaDeCreacion = new Date().toLocaleString(); // Fecha local al crear
      const proyecto = { ...proyectoData, fechaDeCreacion };
      const response = await objModel.insertMany([proyecto]);
      const status = response.length > 0 ? constants.SUCCEEDED_MESSAGE : constants.FAILED_MESSAGE;
      return { status, mensaje: "Proyecto creado correctamente", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al crear el proyecto",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  actualizar: async (proyectoData) => {
    try {
      const filtro = { _id: proyectoData._id };
      const response = await objModel.findOneAndUpdate(filtro, proyectoData, { new: true });
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
      const mensaje = response ? "Proyecto actualizado correctamente" : "Proyecto no encontrado";
      return { status, mensaje, datos: response ? [response] : [] };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al actualizar el proyecto",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  eliminar: async (proyectoData) => {
    try {
      const filtro = { _id: proyectoData._id };
      const response = await objModel.findOneAndRemove(filtro);
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
      const mensaje = response ? "Proyecto eliminado correctamente" : "Proyecto no encontrado";
      return { status, mensaje, datos: response ? [response] : [] };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al eliminar el proyecto",
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
              { nombreProyecto: { $regex: findObject.search, $options: 'i' } },
              { descripcion: { $regex: findObject.search, $options: 'i' } },
            ],
          }
        : {};

      const response = await objModel.aggregate([
        { $match: query },
        { $sort: { nombreProyecto: 1 } },
      ]);

      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "OK", datos: response };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al consultar los proyectos",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },
};

module.exports = repo;
