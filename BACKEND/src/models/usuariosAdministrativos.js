const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuariosSchema = schema({
    IdEmpresa: { type: schema.Types.ObjectId, ref: 'empresas' }, 
    // Fecha: Date,
    FechaNacimiento: String,
    Tipo: String,
    Clase: String,
    Descripcion: String,
    PrimerNombre: String,
    SegundoNombre: String,
    PrimerApellido: String,
    SegundoApellido: String,
    NombreCompleto: String,
    Filtro: String,
    TipoIdentificacion: String,
    NombreTipoIdentificacion: String,
    Usuario: String,
    Clave: String,
    Correo: String,
    Celular: Number,
    Direccion: String,
    Telefono: String,
    NumeroIdentificacion: String,
    IdRol: { type: schema.Types.ObjectId, ref: 'roles' },
    RolNombre: String,
    Servicios: [],
    Cargo: String,
    IdCargo: String,
});

const usuariosAdministrativos = mongoose.model('seguridad_usuariosAdministrativos', usuariosSchema);
module.exports = usuariosAdministrativos;