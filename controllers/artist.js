'use strict'

var path = require('path')
var fs = require('fs')
<<<<<<< HEAD
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
=======
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')
var mongoosePaginate = require('mongoose-pagination')

function getArtist(req, res) {
    //res.status('200').send({message:'metodo getArtist del controlador artist.js'})
    var artistId = req.params.artistId
    
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' })
        } else {
            if (!artist) {
                res.status(400).send({ message: 'el artista no existe' })
            } else {
                res.status(200).send({ artist })
>>>>>>> d0f548a1bd5c0a7294bb0ea2b3ad282e9f8ef2a3
            }
        }
    })
}
function getArtists(req, res) {
    if (req.params.page) {
        var page = req.params.page
    } else {
        var page = 1
    }
    var itemsPerPage = 3

<<<<<<< HEAD
/**
 * @author CperezD
 * @param {} req 
 * @param {*} res 
 * @description funcion para guardar el artista
 */
function saveArtist(req,res){
=======
    Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!artists) {
                res.status(404).send({ message: 'el artista no existe' })
            } else {
                return res.status(200).send({
                    pages: total,
                    artists: artists
                })
            }
        }
    })
}
function saveArtist(req, res) {
>>>>>>> d0f548a1bd5c0a7294bb0ea2b3ad282e9f8ef2a3
    var artist = new Artist()
    var params = req.body

    artist.name = params.name
    artist.description = params.description
    artist.image = 'null'

    artist.save((err, artistStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el artista' })
        } else {
            if (!artistStored) {
                res.status(404).send({ message: 'El artista no ha sido guardado' })
            } else {
                res.status(200).send({ artist: artistStored })
            }
        }

    })

}


function updateArtist(req,res){
    var artistId= req.params.artistId
    var update= req.body

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar Artista' })
        } else {
            if (!artistUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el artista' })
            } else {
                res.status(200).send({ user: artistUpdated })
            }
        }
    })
}


module.exports = {
    getArtist,
<<<<<<< HEAD
    saveArtist  
=======
    saveArtist,
    getArtists,
    updateArtist
>>>>>>> d0f548a1bd5c0a7294bb0ea2b3ad282e9f8ef2a3
}