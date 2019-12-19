'use strict'
var fs = require('fs')
var path= require('path')
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
/**
 * @author CPerez
 * @param {*} req 
 * @param {*} res 
 * @description funcion de actualizacion de datos de usuarios.
 */
function updateUser(req, res) {
    var userId = req.params.id
    var update = req.body

    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar usuario' })
        } else {
            if (!userUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' })
            } else {
                res.status(200).send({ user: userUpdated })
            }
        }
    })
}
/**
 * @author CPerez
 * @param {*} req 
 * @param {*} res
 * @description funcion que permite subir una imagen al usuario 
 */
function uploadImage(req, res) {
    var userId = req.params.id
    var file_name = 'No subido...'
  
    if (req.files) {
        var file_path = req.files.image.path
        var file_split= file_path.split('/')
        var file_name= file_split[2]
        var ext_file= file_name.split('.')
        var file_ext= ext_file[1]

        if (file_ext=='jpg'||file_ext=='gif'||file_ext=='png'){
            User.findByIdAndUpdate(userId,{image:file_name}, (err,userUpdated)=>{
                if (!userUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' })
                }else {
                    res.status(200).send({ user: userUpdated })
                }
            })
        }else{
            res.status(200).send({ message: 'La extension no es correcta' })
        } 
    } else {
        res.status(200).send({ message: 'No se ha subido ninguna imagen' })
    }
}

/**
 * @author Cperez
 * @param {*} req 
 * @param {*} res 
 */
function getImageFile(req,res){
    var imageFile= req.params.imageFile
    var path_file='./uploads/users/'+imageFile
    fs.exists(path_file,function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file))
        }else{
            res.status(200).send({message:'no existe la imagen'})
        }
    })
}

module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile
}
