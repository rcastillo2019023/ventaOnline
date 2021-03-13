"use strict"

var jwt = require("jwt-simple");
var moment = require("moment");
const { use } = require("../routes/user.routes");
var secret="contraseña_secreta_IN6BM";

exports.createToken = function (user){
    var payload = {
        sub: user._id,
        usuario: user.usuario,
        email: user.email,
        rol: user.rol,
        iat: moment().unix(),
        exp: moment().day(10, "days").unix()
    }
    return jwt.encode(payload, secret);
}