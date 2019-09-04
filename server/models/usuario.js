const mongoose = require('mongoose');

// libreria que nos permite manejar de una mejor manera la comprobacion de duplicidad
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};


// Schema: Estructura moongose que contiene la estructura necesaria para interactuar con mongodb
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, ' El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});


// la propiedad methods contiene todos los metodos disponibles por mongoose
// Accediendo a uno de ellos es posible modificarlos
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
};

// Cargar plugin (herramientas) a nuestro Schema moongose
usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

//Un modelo representa una coleccion
module.exports = mongoose.model('Usuario', usuarioSchema); //Creacion (Si no existe) de la coleccion en mongoDB