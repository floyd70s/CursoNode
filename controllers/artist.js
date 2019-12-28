'use strict'

var path = require('path')
var fs = require('fs')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')
var mongoosePaginate = require('mongoose-pagination')

function getArtist(req, res) {
    var artistId = req.params.artistId    
    Artist.findById(artistId, (err, artist) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' })
        } else {
            if (!artist) {
                res.status(400).send({ message: 'el artista no existe' })
            } else {
                res.status(200).send({ artist })
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
    var itemsPerPage = 10

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
    var artistId= req.params.id
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

function deleteArtist(req,res){
    var artistId= req.params.id
    Artist.findByIdAndRemove(artistId,(err,artistRemoved)=>{
        if(err){
            res.status(500).send({ message: 'Error al borrar Artista' })
        }else{
            if(!deleteArtist){
                res.status(404).send({ message: 'No se ha podido borrar el artista' })
            } else{
                res.status(200).send({artistRemoved})
            }
        }
    })
}


module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist
}