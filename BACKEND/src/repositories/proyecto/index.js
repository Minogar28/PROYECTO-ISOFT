const constants = require('../../constants');
const { v1: uuidv1 } = require('uuid');
const mongo = require('mongodb');
const objModel = require('../../models/proyecto'); // Modelo del proyecto
const mongoose = require('mongoose');

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
  
  añadirMiembro: async (nombreProyecto, codigoInvitacion, miembro) => {
    try {
      const filtro = {
        $or: [
          { nombreProyecto: nombreProyecto },
          { codigoInvitacion: codigoInvitacion }
        ]
      };
  
      const proyecto = await objModel.findOne(filtro);
      if (!proyecto) {
        return {
          status: constants.NOT_FOUND_ERROR_MESSAGE,
          mensaje: "Proyecto no encontrado",
          datos: [],
        };
      }
  
      // Verificar si el miembro ya existe en el equipo
      const miembroExiste = proyecto.equipo.some((m) => m._id === miembro._id);
      if (miembroExiste) {
        return {
          status: constants.FAILED_MESSAGE,
          mensaje: "El miembro ya pertenece al equipo",
          datos: [],
        };
      }
  
      // Agregar miembro al equipo
      proyecto.equipo.push(miembro);
      const response = await proyecto.save();
  
      return {
        status: constants.SUCCEEDED_MESSAGE,
        mensaje: "Miembro añadido correctamente",
        datos: [response],
      };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al añadir miembro al equipo",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },
  
  insertar: async (proyectoData) => {
    try {
      const fechaDeCreacion = new Date().toLocaleString(); // Fecha local al crear
      const codigoInvitacion = `${proyectoData.nombreProyecto}-${uuidv1()}`; // Genera el código único

      const proyecto = { ...proyectoData, fechaDeCreacion,codigoInvitacion };
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
      const filtro = { _id: proyectoData._id }; // Extraer el ID del objeto
      const response = await objModel.findOneAndDelete(filtro);
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
  listarPorMiembro: async (miembroId) => {
    try {
      // Crear la consulta con el miembroId como cadena
      const query = { "equipo._id": miembroId };
      console.log("Query ejecutada:", query);
  
      // Ejecutar la consulta
      const response = await objModel.find(query).sort('nombreProyecto'); // Ordenar por 'nombreProyecto'
      console.log("Respuesta obtenida:", response);
  
      // Procesar el resultado
      const status = response.length > 0 ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
      const mensaje = response.length > 0
        ? "Proyectos encontrados"
        : "No se encontraron proyectos para el miembro proporcionado";
  
      return { status, mensaje, datos: response };
    } catch (e2) {
      console.error("Error en listarPorMiembro:", e2);
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al listar los proyectos por miembro",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  }  
  
  
  
};

module.exports = repo;
