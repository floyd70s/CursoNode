'use strict'

var path= require('path')
var fs = require('fs')

var Artist= require('../models/artist')
var Album= require('../models/album')
var Song= require('../models/song')

function getArtist(req,res){
    res.status('200').send({message:'metodo getArtist del controlador artist.js'})
}

module.exports={
    getArtist
}