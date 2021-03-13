"use strict"

const mongoose=require("mongoose");
const app=require("./app");

const User=require("./src/models/user.model");
const Category=require("./src/models/category.model");
const bcrypt=require("bcrypt-nodejs");
const jwt= require("./src/service/jwt");

mongoose.Promise=global.Promise;
mongoose.connect("mongodb://localhost:27017/ventaOnline", {useNewUrlParser:true, useUnifiedTopology:true}).then(()=>{
    console.log("Se conecto correctamente a la base de datos");

    app.listen(3000,function (){
        console.log("El servidor esta arrancando en el puerto 3000")
        
        
        var userModel = new User();
        var categoryModel = new Category();

        User.find({$or: [
            {usuario: "Admin"}
        ]}).exec((err, userFound)=>{
            if(err) console.log("Error en la petición");

            if(userFound && userFound.length>=1){
                console.log("Ya existe un administrador");
            }else {
                userModel.usuario = "Admin";
                userModel.password = "123456"
                userModel.rol = "rol_Admin";
                bcrypt.hash("123456", null, null, (err,encryptpass)=>{
                    userModel.password=encryptpass;
                    userModel.save((err,saveUser)=>{
                        if(saveUser){
                            console.log("El usuario admin a sido creado")
                        }
                    })
                })
            }
        })
        Category.find({$or: [
            {nombre: "Default"}
        ]}).exec((err, userFound)=>{
            if(err) console.log("Error en la petición");

            if(userFound && userFound.length>=1){
                console.log("Ya existe la categoria Default");
            }else {
                categoryModel.nombre = "Default";
                categoryModel.descripcion = "categoria predeterminada";
                    categoryModel.save((err,saveCategory)=>{
                        if(saveCategory){
                            console.log("La categoria Default a sido creado")
                        }
                    })
                
            }
        })
        
    });

}).catch(err=>console.log(err));