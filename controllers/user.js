'use strict'

var bcrypt=require('bcrypt-nodejs')
var User=require('../models/user')

function pruebas(req,res){
    res.status(200).send({
        message: 'prueba de controlador'
    })
}

function saveUser(req, res)
{
    var user = new U
}

module.exports={
    pruebas
}