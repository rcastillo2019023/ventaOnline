"use strict"

const User=require("../models/user.model");
const Cart = require("../models/cart.model")

const bcrypt=require("bcrypt-nodejs");
const jwt= require("../service/jwt");




function login(req, res){
    var params = req.body;

    User.findOne({usuario: params.usuario} ,(err, userFound)=>{
        if(err) return res.status(500).send({mesaje:"Error en la petición"});
        if(userFound) {
            bcrypt.compare(params.password, userFound.password,(err,correctPass)=>{
                if(correctPass){
                    if(params.getToken === "true"){
                        return res.status(200).send({
                            userFound, token: jwt.createToken(userFound)
                        });
                    } else{
                        userFound.password=undefined;
                        return res.status(200).send({mesaje:"Token no valido"});
                    }
                }else{
                    return res.status(404).send({mesaje: "El usuario no se ha podido identificar"})
                }
            })
        }else{
            return res.status(404).send({mesaje: "El usuario no ha podido ingresar"})
        }
    })
}

function register(req, res){
    var userModel = new User();
    var params = req.body;
    if(params.usuario && params.email && params.password){
        userModel.usuario = params.usuario;
        userModel.email = params.email;
        userModel.password = params.password;
        userModel.rol = "rol_Cliente";
        User.find({$or: [
            {usuario: userModel.usuario},
            {email: userModel.email}
        ]}).exec((err, userFound)=>{
            if(err) return res.status(500).send({mesaje:"Error en la petición"});

            if(userFound && userFound.length>=1){
                return res.status(500).send({mesaje: "La empresa ya existe"});
            }else {
                bcrypt.hash(params.password, null, null, (err,encryptpass)=>{
                    userModel.password=encryptpass;
                    userModel.save((err,saveUser)=>{
                        if(saveUser){
                            res.status(200).send(saveUser);
                        }
                    })
                })
            }
        })
    }      
}

function editCliente(req, res){
    var idUsuario = req.params.idAdmin;
    var params= req.body;

    User.findById(req.user.sub, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición x1"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios de administracion"})}
        if(userFound.rol === "rol_Admin"){
                    User.findByIdAndUpdate(params.idUsuario, params, {new:true}, (err, updateUser)=>{
                        if(err) return res.status(500).send({mesaje: "Error en la petición x2"});
                        if(!updateUser) return res.status(500).send({mesaje: "No se pudo actualizar el cliente x1"});
                        return res.status(200).send({updateUser});
            })
            
        }else{
            delete params.rol;
            if(idUsuario != idUsuario){
                return res.status(500).send({mesaje: "No posees los permisos necesarios"})
            }
            User.findByIdAndUpdate(req.user.sub, params, {new:true}, (err, updateUser)=>{
                if(err) return res.status(500).send({mesaje: "Error en la petición x3"});
                if(!updateUser) return res.status(500).send({mesaje: "No se pudo actualizar el cliente"});
                return res.status(200).send({updateUser});
            })
            }
    })
    

}

function deleteCliente(req, res){
    var idUsuario = req.params.idAdmin;
    var params= req.body;

    User.findById(req.user.sub, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
                User.findByIdAndDelete(params.idUsuario, (err, deleteUser)=>{
                    if(err) return res.status(500).send({mesaje: "Error en la petición"});
                    if(!deleteUser) return res.status(500).send({mesaje: "No se puede eliminar el usuario"});
                    return res.status(200).send({deleteUser});
                })    
        }else{
            
            if(idUsuario != idUsuario){
                return res.status(500).send({mesaje: "No posees los permisos necesarios x1"})
            }
            User.findByIdAndDelete(req.user.sub, (err, deleteUser)=>{
                if(err) return res.status(500).send({mesaje: "Error en la petición x2"});
                if(!deleteUser) return res.status(500).send({mesaje: "No se pudo eliminar el usuario"});
                return res.status(200).send({deleteUser});
            })
        }
    })
}


module.exports={
    
    register,
    login,
    editCliente,
    deleteCliente,
    
}