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
            else{
                res.status(500).send({message:'complete los campos'})
            }
        } )
    }
    
    console.log(params)
}
function loginUser(req,res){
    var params=req.body
    var email= params.email
    var password= params.password

    User.findOne({email:email.toLowerCase()},(err,user)=>{
        if(err){
            res.status(500).send({message:'Error en la peticion'})
        }else{
            if(!user){
                res.status(404).send({message:'El usuario no Existe'})
            }else {
                //comprobar contraseña
                bcrypt.compare(password,user.password,function(err, check){
                if (check){
                    //devolver datos usuario 
                    if(params.gethash){
                        //devolver token
                    }else{
                        res.status(200).send({user})
                    }
                }else {
                    res.status(404).send({message:'El usuario no Existe'})
                }
            })
        }

    }
})
}
module.exports={
    pruebas,
    saveUser,
    loginUser
}
