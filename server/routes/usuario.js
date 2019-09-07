const express = require('express');

// Archivo donde se especifica la estructura del Schema Usuario (nombre, email, etc)
const Usuario = require('../models/usuario');
const { verificarToken, verificaAdmin_Role } = require('../middlewares/autenticacion');
const app = express();

// libreria para encriptar cadenas de caracteres
const bcrypt = require('bcrypt');

// libreria para agregar funcionalidad(poderes) a javascript
const _ = require('underscore');


// PETICION GET: Obtener documentos de una coleccion de la base de datos.
app.get('/usuario', verificarToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email role estado google img')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            Usuario.count({ estado: true }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    total: conteo
                });
            });

        });
});

// PETICION POST: Agregar documentos a una coleccion de la base de datos.

app.post('/usuario', [verificarToken, verificaAdmin_Role], (req, res) => {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        // usuarioDB.password = null;

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });
});

// PETICION PUT: Actualizar un documento de la base datos

app.put('/usuario/:id', [verificarToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});


//PETICION DELETE: Borrar(Cambiar de estado) un documento de la base de datos.

app.delete('/usuario/:id', [verificarToken, verificaAdmin_Role], (req, res) => {

    let id = req.params.id;

    // findByIdAndRemove opcion eliminar de la base de datos

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (err, usuarioBorrado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'Usuario no encontrado'
                }
            });

        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;