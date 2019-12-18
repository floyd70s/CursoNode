'use strict'

/**
 * @author CPerezD
 * @description aca se definen las rutas para el modelo usuario
 */

var express= require('express')
var UserController=require('../controllers/user')
var api= express.Router();
var md_auth= require('../middlewares/authenticated')
var multipart=require('connect-multiparty')
var md_upload=multipart({uploadDir:'./uploads/users'})

api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas)
api.post('/register',UserController.saveUser)
api.post('/login',UserController.loginUser)
api.put('/update-user/:id',md_auth.ensureAuth,UserController.updateUser)
api.post('/upload-Image-user/:id',[md_auth.ensureAuth,md_upload],UserController.uploadImage)

module.exports=api