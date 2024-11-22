
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const proyectoSchema = schema({
  nombreProyecto: String,
  descripcion: String,
 fechaDeCreacion:String,
 fechaFinalizacion:String,
 privacidad:String,
 estado:String,
 vista:String,
 IdAdmin: { type: schema.Types.ObjectId, ref: 'seguridad_usuariosAdministrativos' }, 
 equipo:[],
 objetivos:[]
});

const proyectos = mongoose.model('proyecto', proyectoSchema);
module.exports = proyectos;

