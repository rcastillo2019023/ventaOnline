"use strict"

const Category=require("../models/category.model");
const User=require("../models/user.model");
const Product=require("../models/product.model");

const bcrypt=require("bcrypt-nodejs");
const jwt= require("../service/jwt");
const { SSL_OP_NETSCAPE_DEMO_CIPHER_CHANGE_BUG } = require("constants");



function createCategory(req, res){
    var categoryModel = new Category();
    var idAdmin = req.params.idAdmin;
    var params = req.body;

    User.findById(idAdmin, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
            if(params.nombre && params.descripcion){
                categoryModel.nombre = params.nombre;
                categoryModel.descripcion = params.descripcion;
                Category.find({$or: [
                    {nombre: categoryModel.nombre}
                ]}).exec((err, categoryFound)=>{
                    if(err) return res.status(500).send({mesaje:"Error en la petición"});
        
                    if(categoryFound && categoryFound.length>=1){
                        return res.status(500).send({mesaje: "La empresa ya existe"});
                    }else {
                            categoryModel.save((err,saveCategory)=>{
                                if(saveCategory){
                                    res.status(200).send(saveCategory);
                                }
                            })
                        
                    }
                })
            }
        }else{
            return res.status(500).send({mesaje: "No tienes los permisos suficientes"});
        }
    })
}

function editCategory(req, res){
    var idAdmin = req.params.idAdmin;
    var params= req.body;

    User.findById(idAdmin, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
                    Category.findByIdAndUpdate(params.idCategoria, params, {new:true}, (err, updateCategory)=>{
                        if(err) return res.status(500).send({mesaje: "Error en la petición"});
                        if(!updateCategory) return res.status(500).send({mesaje: "No se pudo actualizar la categoria"});
                        return res.status(200).send({updateCategory});
            })
            
        }else{
            return res.status(500).send({mesaje: "No tienes los permisos suficientes"});
        }
    })
    

}

function deleteCategory(req, res){
    var productModel = new Product();
    var idAdmin = req.params.idAdmin;
    var params= req.body;

    User.findById(idAdmin, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
            Product.updateMany({$or:[
                {idCategoria: params.idCategoria}
            ]}).exec((err, obtainedEmployee)=>{
                if(err) return res.status(500).send({mensaje: "Error en la peticion"})
                if(!obtainedEmployee) return res.status(500).send({mensaje:"no se encontraron empleados"})
                productModel.idCategoria = "Default"
                Category.findByIdAndDelete(params.idCategoria, (err, deleteCategory)=>{
                    if(err) return res.status(500).send({mesaje: "Error en la petición"});
                    if(!deleteCategory) return res.status(500).send({mesaje: "No se puede eliminar la empresa"});
                    return res.status(200).send({deleteCategory});
                
                })

            })
           

        }else{
            return res.status(500).send({mesaje: "No tienes los permisos suficientes"});
        }
    })

    

    
}
module.exports={
    createCategory,
    editCategory,
    deleteCategory
}