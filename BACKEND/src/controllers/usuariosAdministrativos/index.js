const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const validarIngreso = require('./validarIngreso');
const listarPorIdentificacion = require('./listarPorIdentificacion');
const consultar = require('./consultar');
const listarUnUsuario = require('./listarUnUsuario');
const listarUsuarioFuncionario = require('./listarUsuarioFuncionario')

module.exports = {
  listarUsuarioFuncionario,
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  validarIngreso,
  listarPorIdentificacion,
  consultar,
  listarUnUsuario,
}
