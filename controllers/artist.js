'use strict'

var path = require('path')
var fs = require('fs')
var mongoosePaginate = require('mongoose-pagination')

var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')

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

    Artist.find().sort('name').pagintate(page, itemsPerPage, function (arr, artist, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!artist) {
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

module.exports = {
    getArtist,
    saveArtist,
    getArtists
}