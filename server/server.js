// require archivo donde se encuentran las configuraciones globales
require('./config/config');

const express = require('express');
// libreia para manejar mongoDB con node
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// libreria para manejar data recibida en formato JSON
const bodyParser = require('body-parser');

//Middleware: funcion que se ejecuta mediante un activador
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));

// archivo donde se manejan los diferentes tipos de peticiones HTTP
//Configuracion global de rutas
app.use(require('./routes/index'));

//Conexion local base datos mongoDB
mongoose.connect(process.env.URLDB, (err, resp) => {

    if (err) throw err;

    console.log('Base de datos ONLINE');

});

// Configuracion puerto para iniciar app node
app.listen(process.env.PORT, () => {
    console.log(`Servidor iniciado en el puerto, ${process.env.PORT}`);
});