// index.js
const path = require('path');
require('dotenv').config(); // Carga las variables de entorno desde el archivo .env

const NODE_ENV = process.env.NODE_ENV || 'development';
const PORT = process.env.PORT || 5000;

// Cargar NewRelic en entornos específicos
if (['production', 'test', 'dev'].includes(NODE_ENV)) {
    // require('newrelic');
}

const { connect } = require('./helpers/mongo');

// Conectar a MongoDB
connect().then((isConnected) => {
    if (isConnected) {
        // Iniciar el servidor Express si la conexión fue exitosa
        const app = require('./app');
        app.listen(PORT,'0.0.0.0', () => {
            console.log(`Servidor escuchando en el puerto ${PORT} en el entorno ${NODE_ENV}`);

            if (isConnected) {
                console.log(`MongoDB conectado en el entorno ${NODE_ENV}`);
            }
        });
    } else {
        console.error('No se pudo conectar a MongoDB');
    }
}).catch(err => {
    console.error('Error al conectar a MongoDB:', err);
});
