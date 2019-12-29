'use strict'
var express= require('express')
var SongController= require('../controllers/song')
var api=express.Router()
var md_auth= require('../middlewares/authenticated')

var multipart=require('connect-multiparty')
var md_upload=multipart({uploadDir:'./uploads/songs'})

api.get('/song/:id',md_auth.ensureAuth,SongController.getSong) 
api.post('/song',md_auth.ensureAuth,SongController.saveSong)
api.get('/songs/:page?',md_auth.ensureAuth,SongController.getSongs)
// api.put('/song/:id',md_auth.ensureAuth,SongController.updateAlbum)
// api.delete('/song/:id',md_auth.ensureAuth,SongController.deleteAlbum)
// api.post('/upload-Image-song/:id',[md_auth.ensureAuth,md_upload],SongController.uploadImage)
// api.get('/get-Image-song/:imageFile',SongController.getImageFile)
module.exports=api