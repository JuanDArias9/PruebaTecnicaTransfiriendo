const express = require('express');
const morgan = require('morgan');

// SERVER
const app = express();

// ESPECIFICAR VARIABLE PUERTO
app.set('port', process.env.PORT || 3000)

// MODULOS
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/corrales", require('./routes/corrales.routes'));
app.use("/api/animales", require('./routes/animales.routes'));

module.exports = app;