'use strict'

/**
 * @author CPerezD
 * @description aca se definen las rutas para el modelo usuario
 */

var express= require('express')
var UserController=require('../controllers/user')
var api= express.Router();
var md_auth= require('../middlewares/authenticated')

api.get('/probando-controlador',md_auth.ensureAuth,UserController.pruebas)
api.post('/register',UserController.saveUser)
api.post('/login',UserController.loginUser)

module.exports=api