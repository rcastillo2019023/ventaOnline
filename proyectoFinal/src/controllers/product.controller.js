"use strict"

const Product=require("../models/product.model");
const User=require("../models/user.model");



function createProduct(req, res){
    var productModel = new Product();
    var idAdmin = req.params.idAdmin;
    var params = req.body;

    User.findById(idAdmin, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
            if(params.nombre && params.descripcion && params.categoria && params.stock && params.precio){
                productModel.nombre = params.nombre;
                productModel.descripcion = params.descripcion;
                productModel.idCategoria = params.categoria;
                productModel.stock = params.stock;
                productModel.precio = params.precio;
                Product.find({$or: [
                    {nombre: productModel.nombre}
                ]}).exec((err, productFound)=>{
                    if(err) return res.status(500).send({mesaje:"Error en la petición"});
        
                    if(productFound && productFound.length>=1){
                        return res.status(500).send({mesaje: "La empresa ya existe"});
                    }else {
                            productModel.save((err,saveProduct)=>{
                                if(saveProduct){
                                    res.status(200).send(saveProduct);
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

function editProduct(req, res){
    var idAdmin = req.params.idAdmin;
    var params= req.body;

    User.findById(req.user.sub, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
                    Product.findByIdAndUpdate(params.idProducto, params, {new:true}, (err, updateProduct)=>{
                        if(err) return res.status(500).send({mesaje: "Error en la petición"});
                        if(!updateProduct) return res.status(500).send({mesaje: "No se pudo actualizar el producto"});
                        return res.status(200).send({updateProduct});
            })
            
        }else{
            return res.status(500).send({mesaje: "No tienes los permisos suficientes"});
        }
    })
    

}

function deleteProduct(req, res){
    var idAdmin = req.params.idAdmin;
    var params= req.body;

    User.findById(idAdmin, (err, userFound)=>{
        if(err) return res.status(500).send({mesaje: "Error al hacer la petición"});
        if(!userFound){return res.status(500).send({mesaje: "No posees los permisos necesarios"})}
        if(userFound.rol === "rol_Admin"){
                Product.findByIdAndDelete(params.idProducto, (err, deleteProduct)=>{
                    if(err) return res.status(500).send({mesaje: "Error en la petición"});
                    if(!deleteProduct) return res.status(500).send({mesaje: "No se puede eliminar la empresa"});
                    return res.status(200).send({deleteProduct});
                
                })
            
        }else{
            return res.status(500).send({mesaje: "No tienes los permisos suficientes"});
        }
    })
}

function searchProductName(req, res){
    var idEmpresa = req.params.idEmpresa;
    var params= req.body;

    Product.find({$or: [
        {nombre: params.nombre}
    ]}).exec((err,productFound)=>{
        if (err) return res.status(500).send({mensaje:"Error en la peticion"})
        if (productFound && productFound.length>=1) {
            return res.status(200).send(productFound)
            
        }else{ 
            return res.status(500).send({mensaje: "no existe el empleado"})
        }
     
    })

    
}
module.exports={
    createProduct,
    editProduct,
    deleteProduct,
    searchProductName
}