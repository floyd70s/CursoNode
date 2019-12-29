'use strict'

var path = require('path')
var fs = require('fs')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')
var mongoosePaginate = require('mongoose-pagination')

function getSong(req, res) {
    var songId = req.params.id
    Song.findById(songId).populate({path:'album'}).exec((err, song) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' })
        } else {
            if (!song) {
                res.status(400).send({ message: 'la cancion no existe' })
            } else {
                res.status(200).send({ song })
            }
        }
    })
}

function getSongs(req, res) {
    if (req.params.page) {
        var page = req.params.page
    } else {
        var page = 1
    }
    var itemsPerPage = 10

    Song.find().sort('number').paginate(page, itemsPerPage, function (err, song, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!song) {
                res.status(404).send({ message: 'el album no existe' })
            } else {
                return res.status(200).send({
                    pages: total,
                    song: song
                })
            }
        }
    })
}

function saveSong(req, res) {
    var song = new Song()
    var params = req.body

    song.number = params.number
    song.name = params.name
    song.duration = params.duration
    song.file = params.file
    song.album = params.album

   
    song.save((err, songStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar la cancion' })
        } else {
            if (!songStored) {
                res.status(404).send({ message: 'La cancion no ha sido guardada' })
            } else {
                res.status(200).send({ song: songStored })
            }
        }
    })
}




module.exports ={
    getSong,
    saveSong,
    getSongs
}