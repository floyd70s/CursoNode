'use strict'

var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('../services/jwt')


function pruebas(req, res) {
    res.status(200).send({
        message: 'prueba de controlador'
    })
}


/**
 * @author CPerez
 * @param {*} req 
 * @param {*} res
 * @description: funcion de registro de usuarios 
 */
function saveUser(req, res) {
    var user = new User()
    var params = req.body


    user.name = params.name
    user.surname = params.surname
    user.email = params.email
    user.role = 'ROLE_ADMIN'
    user.image = 'null'

    if (params.password) {
        //encriptar contraseña
        bcrypt.hash(params.password, null, null, function (err, hash) {
            user.password = hash;
            console.log(hash)
            if (user.name != null && user.surname != null && user.email != null) {
                //guardar usuario
                user.save((err, userStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error al guardar el usuario' })
                    } else {
                        if (!userStored) {
                            res.status(404).send({ message: 'No se ha registrado el usuario' })
                        } else {
                            res.status(200).send({ user: userStored })
                        }
                    }
                })
            }
            else {
                res.status(500).send({ message: 'complete los campos' })
            }
        })
    }

    console.log(params)
}

/**
 * @author CPerez
 * @param {*} req 
 * @param {*} res 
 * @description funcion de ingreso de usuarios.
 */
function loginUser(req, res) {
    var params = req.body
    var email = params.email
    var password = params.password
    console.log(params)
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!user) {
                res.status(404).send({ message: 'El usuario no Existe' })
            } else {
                //comprobar contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        //devolver datos usuario 
                        if (params.gethash) {
                            //devolver token
                            res.status(200).send({
                                token: jwt.createToken(user)
                            })
                        } else {
                            res.status(200).send({ user })
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no Existe' })
                    }
                })
            }

        }
    })
}
module.exports = {
    pruebas,
    saveUser,
    loginUser
}
