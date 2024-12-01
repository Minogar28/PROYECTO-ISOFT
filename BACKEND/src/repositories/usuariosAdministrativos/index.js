const constants = require('../../constants');
const objModel = require('../../models/usuariosAdministrativos');
const objModelKey = require('../../models/clavesTemporales');
const mongo = require('mongodb');
const nodemailer = require('nodemailer');
const { response } = require('express');
const requests = require("request");
const jwt = require('jsonwebtoken');

const repo = {

  listar: async (idEmpresa) => {
    try {
      //find query
      let query = { "IdEmpresa": new mongo.ObjectID(idEmpresa) };

      //find object
      let response = await objModel.find(query).sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  listarUsuarioFuncionario: async (objData) => {
    try {

      //find query
      let query = { "IdEmpresa": new mongo.ObjectID(objData.IdEmpresa), RolNombre: 'Funcionario' };

      //find object
      let response = await objModel.find(query).sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  listarUnUsuario: async (objdata) => {
    try {
      //find query
      let query = {
        "IdEmpresa": new mongo.ObjectID(objdata.value),
        "_id": new mongo.ObjectID(objdata.key)
      };

      //find object
      let response = await objModel.find(query).sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  buscar: async ({ findObject }) => {
    try {
      //find query
      let query = {};
      query[findObject.key] = findObject.value;
      //find object
      let response = await objModel.find(query).populate('Empresa').sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  insertar: async (objData) => {
    try {
      // new mongo.ObjectID(idEmpresa)

      let status, failure_code, failure_message;

      // Verificar si el correo ya está registrado. Si lo está no inserta el nuevo registro.

      let { Correo,Identificacion, Usuario } = objData;
      let objCorreo = await objModel.findOne({ Correo, IdEmpresa: objData.IdEmpresa });
     // Verificar si la Identificación ya está registrada
    //  let objIdentificacion = await objModel.findOne({ Identificacion, IdEmpresa:objData.IdEmpresa });
     let objUsuario = await objModel.findOne({Usuario, IdEmpresa:objData.IdEmpresa})
      let response = {};

      if (objCorreo) {
        throw new Error('El correo ingresado se encuentra en uso. Por favor ingrese otro correo.');
      } else{
        // //find object
        response = await objModel.insertMany([objData]);
      }

      // //find object
      // let response = await objModel.insertMany([objData]);

      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        roles: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  actualizar: async (objData) => {
    try {

      let status, failure_code, failure_message;

      // Verificar si el correo ya está registrado. Si lo está no inserta el nuevo registro.
      let { Correo, HasCorreoChanged, IdEmpresa } = objData;

      let response = {};

      //Condición si el correo ha cambiado
      if (HasCorreoChanged) {
        let objCorreo = await objModel.findOne({ Correo, IdEmpresa });

        // Si el correo ya está en la base de datos
        if (objCorreo) {
          throw new Error('El correo ingresado se encuentra en uso. Por favor ingrese otro correo.');
        } else {

          // let objFiltro = { _id: objData._id };
          let objFiltro = { Identificacion: objData.Identificacion, IdEmpresa: objData.IdEmpresa };

          //find object
          response = await objModel.findOneAndUpdate(objFiltro, objData, { new: true }) // { new: true } para que retorne la data actualizada 
        }
      } //Si el correo no cambió que se actualice los demás datos.
      else {

        // let objFiltro = { _id: objData._id };
        let objFiltro = { Identificacion: objData.Identificacion, IdEmpresa: objData.IdEmpresa };

        //find object
        response = await objModel.findOneAndUpdate(objFiltro, objData, { new: true }) // { new: true } para que retorne la data actualizada 
      }


      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  eliminar: async (objdata) => {
    try {

      let status, failure_code, failure_message;

      let objFiltro = { _id: objdata._id };

      //find object
      let response = await objModel.findOneAndRemove(objFiltro, objdata);

      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  validarIngreso: async (findObject) => {
    try {

      //find object
      let response = await objModel.find(findObject).populate('Empresa').sort('PrimerNombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        pacientes: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  validarIngreso2: async (findObject) => {
    try {
      // Define el query para encontrar al usuario en la base de datos
      let query = {
        Correo: { $regex: findObject.Login, $options: "i" },
        Clave: findObject.Clave
      };
  
      // Busca el usuario en la base de datos
      let response = await objModel.find(query, {
        _id: 1,
        IdEmpresa: 1,
        Correo: 1,
        PrimerNombre: 1,
        NombreCompleto: 1,
        NumeroIdentificacion: 1,
        TipoIdentificacion: 1,
        IdRol: 1,
        RolNombre: 1,
        PrimerApellido: 1,
        Celular: 1,
        Usuario:1
      }).populate('IdRol');
      
      
      // Verifica si `response` tiene algún valor antes de intentar acceder a sus propiedades
      if (response && response.length > 0) {
        // Genera el token JWT si el usuario es válido
        let token = jwt.sign(
          {
            name: findObject.Login,
            id: response[0]._id,
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 6) // Expiración de 6 horas
          },
          constants.TOKEN_SECRET
        );
  
        return {
          status: constants.SUCCEEDED_MESSAGE,
          datos: response,
          token: token,
          failure_code: null,
          failure_message: null
        };
      } else {
        // Maneja el caso donde no se encuentra el usuario
        return {
          status: constants.FAILED_MESSAGE,
          datos: [],
          token: null,
          failure_code: "AUTH_FAILED",
          failure_message: "Usuario o contraseña incorrecta"
        };
      }
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message
      };
    }
  },
  

  listarPorIdentificacion: async (objParameters) => {
    try {
      //find query
      let query = {
        "IdEmpresa": objParameters.value,
        "Identificacion": objParameters.key
      };

      // query = {};

      //let query = { "Codigo": "001" };

      //find object
      // let response = await objModel.find(query).sort('Nombre');
      let response = await objModel.find(query);

      //set values 

      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

 
  consultar : async ({ findObject }) => {
    try {
      // Construir el filtro para buscar por el campo Usuario
      const query = { Usuario: { $regex: findObject.search, $options: 'i' } };
  
      // Buscar usuario en la base de datos
      const usuarioEncontrado = await objModel.findOne(query, '_id Identificacion NombreCompleto');
  
      // Verificar si se encontró el usuario
      if (!usuarioEncontrado) {
        return {
          status: constants.NOT_FOUND_ERROR_MESSAGE,
          mensaje: "Usuario no encontrado",
          datos: [],
        };
      }
  
      const status = constants.SUCCEEDED_MESSAGE;
      return { status, mensaje: "Usuario encontrado", datos: usuarioEncontrado };
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        mensaje: "Error al consultar usuario",
        datos: [],
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

}; module.exports = repo;
