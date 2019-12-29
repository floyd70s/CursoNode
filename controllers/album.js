'use strict'

var path = require('path')
var fs = require('fs')
var Artist = require('../models/artist')
var Album = require('../models/album')
var Song = require('../models/song')
var mongoosePaginate = require('mongoose-pagination')

function getAlbum(req, res) {
    var albumId = req.params.id
    Album.findById(albumId, (err, album) => {
        if (err) {
            res.status(500).send({ message: 'error en la peticion' })
        } else {
            if (!album) {
                res.status(400).send({ message: 'el album no existe' })
            } else {
                res.status(200).send({ album })
            }
        }
    })
}
function getAlbums(req, res) {
    if (req.params.page) {
        var page = req.params.page
    } else {
        var page = 1
    }
    var itemsPerPage = 10

    Album.find().sort('name').paginate(page, itemsPerPage, function (err, album, total) {
        if (err) {
            res.status(500).send({ message: 'Error en la peticion' })
        } else {
            if (!album) {
                res.status(404).send({ message: 'el album no existe' })
            } else {
                return res.status(200).send({
                    pages: total,
                    album: album
                })
            }
        }
    })
}
function saveAlbum(req, res) {
    var album = new Album()
    var params = req.body

    album.title = params.title
    album.description = params.description
    album.year = params.year
    album.image = 'null'
    album.artist = params.artist

    album.save((err, albumStored) => {
        if (err) {
            res.status(500).send({ message: 'Error al guardar el album' })
        } else {
            if (!albumStored) {
                res.status(404).send({ message: 'El album no ha sido guardado' })
            } else {
                res.status(200).send({ album: albumStored })
            }
        }

    })

}
function updateAlbum(req, res) {
    var albumId = req.params.id
    var update = req.body
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar Artista' })
        } else {
            if (!albumUpdated) {
                res.status(404).send({ message: 'No se ha podido actualizar el artista' })
            } else {
                res.status(200).send({ user: albumUpdated })
            }
        }
    })
}
function deleteAlbum(req, res) {
    var albumId = req.params.id
    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            res.status(500).send({ message: 'Error al borrar album' })
        } else {
            if (!deleteAlbum) {
                res.status(404).send({ message: 'No se ha podido borrar el album' })
            } else {
                res.status(200).send({ album: albumRemoved })
            }
        }
    })
}
function uploadImage(req, res) {
    var albumId = req.params.id
    var file_name = 'no subido.'

    if (req.files) {
        var file_path = req.files.image.path
        var file_split = file_path.split('/')
        var file_name = file_split[2]
        var ext_file = file_name.split('.')
        var file_ext = ext_file[1]

        console.log('albumId: ' + albumId)
        console.log('file_name: ' + file_name)

        if (file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'png') {
            Album.findByIdAndUpdate(albumId, { image: file_name }, (err, albumUpdated) => {
                if (!albumUpdated) {
                    res.status(404).send({ message: 'No se ha podido actualizar la imagen del album' })
                } else {
                    res.status(200).send({ album: albumUpdated })
                }
            })
        } else {
            res.status(200).send({ message: 'La extension no es correcta' })
        }
    } else {
        res.status(200).send({ message: 'No se ha subido ninguna imagen' })
    }
}
function getImageFile(req, res) {
    var imageFile = req.params.imageFile
    var path_file = './uploads/albums/' + imageFile
    fs.exists(path_file, function (exists) {
        if (exists) {
            res.sendFile(path.resolve(path_file))
        } else {
            res.status(200).send({ message: 'no existe la imagen' })
        }
    })
}


module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}