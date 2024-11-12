
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const proyectoSchema = schema({
  nombreProyecto: String,
  descripcion: String,
 fechaDeCreacion:String,
 privacidad:String,
 estado:String,
 equipo:[],
 objetivos:[]
});

const proyectos = mongoose.model('proyecto', proyectoSchema);
module.exports = proyectos;

