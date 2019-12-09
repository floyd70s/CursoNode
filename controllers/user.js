'use strict'


var User=require('../models/user')

function pruebas(req,res){
    res.status(200).send({
        message: 'prueba de controlador'
    })
}

function saveUser(req, res){
    var user= new User()
    var params= req.body

    console.log(params)
    user.name= params.name
    user.surname= params.surname
    user.email= params.email
    user.role= 'ROLE_USER'
    user.image= 'null'
    
    if(params.password){
        //encriptar contraseña
    }
    else{
        res.status(500).send({message:'introduce la contraseña'})
    }
}


module.exports={
    pruebas
}