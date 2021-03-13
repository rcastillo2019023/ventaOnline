"use strict"

const express=require("express");
const productController=require("../controllers/product.controller")

var authentication=require("../middleswares/authenticated");

var api=express.Router();
api.post("/createProduct/:idAdmin", authentication.ensureAuth, productController.createProduct);
api.put("/editProduct/:idAdmin",authentication.ensureAuth , productController.editProduct);
api.put("/deleteProduct/:idAdmin",authentication.ensureAuth , productController.deleteProduct);
api.get("/searchProductName/:idAdmin",authentication.ensureAuth , productController.searchProductName);
module.exports=api;