
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const tareasSchema = schema({
  nombreTarea: String,
  descripcion: String,
 fechaDeCreacion:String,
 fechaFinalizacion:String,
 estado:String,
 IdProyecto: { type: schema.Types.ObjectId, ref: 'proyecto' }, 
 archivodAdjuntos:[],
 comentarios:[],
 asignados:[],
 subTareas:[]
});

const tareas = mongoose.model('tareas', tareasSchema);
module.exports = tareas;

