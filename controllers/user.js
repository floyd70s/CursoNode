'use strict'


var User=require('../models/user')
var bcrypt = require('bcrypt-nodejs')

function pruebas(req,res){
    res.status(200).send({
        message: 'prueba de controlador'
    })
}

function saveUser(req, res){
    var user= new User()
    var params= req.body

    
    user.name= params.name
    user.surname= params.surname
    user.email= params.email
    user.role= 'ROLE_USER'
    user.image= 'null'
    
    if(params.password){
        //encriptar contraseña
        bcrypt.hash(params.password,null, null, function(err,hash){
            user.password=hash;

            if (user.name != null && user.surname!=null && user.email!=null){
                //guardar usuario
                user.save((err,userStored)=>{
                    if(err){
                        res.status(500).send({message:'Error al guardar el usuario'})
                    }else{
                        if(!userStored){
                            res.status(404).send({message:'No se ha registrado el usuario'})
                        }else{
                            res.status(200).send({user:userStored})
                        }
                    }
                })
            }
        } )
    }
    else{
        res.status(500).send({message:'complete los campos'})
    }
    console.log(params)
}


module.exports={
    pruebas,
    saveUser
}