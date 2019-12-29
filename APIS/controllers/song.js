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




function updateSong(req, res) {
    var songId= req.params.id
    var update = req.body

    Song.findByIdAndUpdate(songId, update, (err, songUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar la cancion' })
        } else {
            if (!songUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar la cancion' })
            } else {
                res.status(200).send({ song: songUpdated })
            }
        }
    })
}

function deleteSong(req, res) {
    var songId = req.params.id
    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar cancion' })
        } else {
            if (!deleteSong) {
                res.status(404).send({ message: 'No se ha podido borrar la cancion' })
            } else {
                res.status(200).send({ song: songRemoved })
            }
        }
    })
}

function uploadFile(req, res) {
    var songId = req.params.id
    var file_name = 'no subido.'

    if (req.files) {
        var file_path = req.files.file.path
        var file_split = file_path.split('/')
        var file_name = file_split[2]
        var ext_file = file_name.split('.')
        var file_ext = ext_file[1]

        if (file_ext == 'mp3' || file_ext == 'wav' || file_ext == 'flac') {
            Song.findByIdAndUpdate(songId, { file: file_name }, (err, songUpdated) => {
                if (!songUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar el archivo de la cancion' })
                } else {
                    res.status(200).send({ song: songUpdated })
                }
            })
        } else {
            res.status(200).send({ message: 'La extension no es correcta' })
        }
    } else {
        res.status(200).send({ message: 'No se ha subido ningun archivo de audio' })
    }
}

function getSongFile(req, res) {
    var songFile = req.params.songFile
    var path_file = './uploads/songs/' + songFile
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ message: 'no existe el archivo' })
        }
    })
}


module.exports ={
    getSong,
    saveSong,
    getSongs,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
}