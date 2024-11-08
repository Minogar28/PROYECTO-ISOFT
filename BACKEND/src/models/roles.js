const mongoose = require('mongoose');
const schema = mongoose.Schema;

const rolSchema = schema({
 	Codigo: String,
 	Nombre: String,
 	IdEmpresa: String,
	IdUsuarioRegistro: String,
	FechaRegistro : Date,
	IdUsuarioActualizacion: String,
	FechaActualizacion: Date,
	Permisos: Array,
	id: String,
	text: String,
	Procesos: { 
        recepcion: { type: Boolean },
        diagnostico: { type: Boolean},
        cotizacion: { type: Boolean},
        reparacion: { type: Boolean },
        entrega: { type: Boolean }
    },
    Empresa: { type: schema.Types.ObjectId, ref: 'empresas' }
});

const roles = mongoose.model('roles', rolSchema);
module.exports = roles;