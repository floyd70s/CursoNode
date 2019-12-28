'use strict'

var path= require('path')
var fs = require('fs')
var mogoosePaginate=require('mongoosePagination')

var Artist= require('../models/artist')
var Album= require('../models/album')
var Song= require('../models/song')

function getArtists(req,res){
    var page= req.params.page
    var itemsPerPage=3

    artist.find().sort('name').paginate(page,itemsPerPage,funcion(err,artists,total){
        if(err){
            res.status(500).send({message:'error en la peticion'})
        }else{
            if(!artists){
                res.status(404).send({message:'no hay artistas'})
            }else{
                return res.status(200).send({
                    pages:total,
                    artists:artists
                })
            }
        }
    })
}

function getArtist(req,res){
    var artistId=req.params.id
    Artist.findById(artistId,(err,artist)=>{
        if(err){
            res.status(500).send({message:"Error en la peticion"})
        }else{
            if(!artist){
                res.status(404).send({message:"El artista no existe"})
            }else{
                res.status(200).send({artist})
            }
        }
    })
}

/**
 * @author CperezD
 * @param {} req 
 * @param {*} res 
 * @description funcion para guardar el artista
 */
function saveArtist(req,res){
    var artist = new Artist()
    var params = req.body

    artist.name= params.name
    artist.description= params.description
    artist.image= 'null'

    artist.save((err, artistStored)=>{
        if(err){
            res.status(500).send({message:'Error al guardar el artista'})
        }else{
            if(!artistStored){
                res.status(404).send({message:'El artista no ha sido guardado'})
            }else{
                res.status(200).send({artist:artistStored})
            }
        }

    })

}

module.exports={
    getArtist,
    saveArtist  
}