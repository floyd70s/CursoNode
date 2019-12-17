'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'clave-secreta'

/**
 * @author CPerezD
 * @param {*} user 
 * @description creacion del token con JWT
 */
exports.createToken =
    function (user) {
        var payload = {
            sub: user._id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            role: user.role,
            image: user.image,
            iat: moment().unix,
            exp: moment().add(30, 'days').unix
        }
        return jwt.encode(payload, secret)
    }