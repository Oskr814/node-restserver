//=======================
//Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
//Entorno
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
//Base de datos
//=======================

let urlDB;

//if (process.env.NODE_ENV === 'dev') {
// urlDB = 'mongodb://localhost:27017/database';
//} else {
urlDB = 'mongodb+srv://Admin:Admi1122@cluster0-wdpyi.mongodb.net/database?retryWrites=true&w=majority';
//}

process.env.URLDB = urlDB;