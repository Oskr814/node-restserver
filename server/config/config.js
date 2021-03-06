//=======================
//Puerto
//=======================
process.env.PORT = process.env.PORT || 3000;

//=======================
//Entorno
//=======================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=======================
//Caducidad token
//=======================
//60 segundos
//60 minutos
//24 horas
//30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//=======================
//SEED TOKEN
//=======================

process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//=======================
//Base de datos
//=======================

let urlDB;

//if (process.env.NODE_ENV === 'dev') {
//  urlDB = 'mongodb://localhost:27017/database';
//} else {
urlDB = process.env.MONGO_URI;
//}

process.env.URLDB = urlDB;

//=======================
//Google Client ID
//=======================
process.env.CLIENT_ID = process.env.CLIENT_ID || '632754920314-vi4chjnpd9jqep8q2de3m08do2la9c1r.apps.googleusercontent.com';