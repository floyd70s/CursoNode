'use strict'

function pruebas(req,res){
    res.status(200).send({
        message: 'prueba de controlador'
    })
}

module.exports={
    pruebas
}