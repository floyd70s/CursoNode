'use strict'
var express= require('express')
var AlbumController= require('../controllers/album')
var api=express.Router()
var md_auth= require('../middlewares/authenticated')

var multipart=require('connect-multiparty')
var md_upload=multipart({uploadDir:'./uploads/album'})

api.get('/album/:id',md_auth.ensureAuth,AlbumController.getAlbum) 
api.post('/album',md_auth.ensureAuth,AlbumController.saveAlbum)
api.get('/albums/:page?',md_auth.ensureAuth,AlbumController.getAlbums)
api.put('/albums/:id',md_auth.ensureAuth,AlbumController.updateAlbum)
api.delete('/album/:id',md_auth.ensureAuth,AlbumController.deleteAlbum)
api.post('/upload-Image-album/:id',[md_auth.ensureAuth,md_upload],AlbumController.uploadImage)
api.get('/get-Image-album/:imageFile',AlbumController.getImageFile)
module.exports=api