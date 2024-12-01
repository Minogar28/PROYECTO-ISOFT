const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const consultar = require('./consultar')
const añadirMiembro = require('./añadirMiembro')
const listarPorMiembro = require('./listarPorMiembro')
module.exports = {
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  consultar,
  añadirMiembro,
  listarPorMiembro
}
