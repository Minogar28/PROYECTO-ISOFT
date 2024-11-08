'use strict';

const mongoose = require('mongoose');
const config = require('../../../config'); // Configura esta ruta si es necesario

mongoose.Promise = global.Promise;

const connect = async () => {
    const mongoURI = process.env.MONGO_URI || config.db.mongoURI; // Usa la URI de MongoDB desde la variable de entorno o desde config.js

    console.info(`Connecting to ${mongoURI}`);

    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.info('Connected successfully to MongoDB');

        const connection = mongoose.connection;

        // Eventos de conexión para seguimiento
        connection.on('connecting', () => console.info('Connecting to MongoDB...'));
        connection.on('disconnecting', () => console.info('Disconnecting from MongoDB...'));
        connection.on('disconnected', () => console.info('Disconnected from MongoDB'));
        connection.on('close', () => console.info('MongoDB connection closed'));
        connection.on('error', (err) => console.error('Error Connecting to MongoDB:', err.message));
        connection.on('reconnected', () => console.info('MongoDB reconnected successfully'));

        return true;
    } catch (err) {
        console.error('MongoDB connection error:', JSON.stringify(err));
        return false;
    }
};

/* istanbul ignore next */
const isConnected = () => {
    return mongoose.connection.readyState === 1;
};

module.exports = {
    connect,
    isConnected,
};
