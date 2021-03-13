"use strict"

var jwt=require("jwt-simple");
var moment=require("moment");
var secret="contraseña_secreta_IN6BM";

exports.ensureAuth=function(req, res, next){
    if(!req.headers.authorization){
        return res.status(400).send({mesaje:"no cuenta con los permisos necesarios"});
    }
    var token = req.headers.authorization.replace(/['"]+/g,"")
    try{
        var payload = jwt.decode(token, secret)
        if( payload.exp <= moment().unix() ){
            return res.statu(401).send({mesaje: "El token ha expirado"});
        }
    }catch (error){
        return res.status(404).send({mesaje: "Token invalido"})
    }
    req.user = payload;
    next();
}