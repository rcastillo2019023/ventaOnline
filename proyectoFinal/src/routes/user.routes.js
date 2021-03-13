"use strict"

const express=require("express");
const userController=require("../controllers/user.controller")

var authentication=require("../middleswares/authenticated");

var api=express.Router();
api.post("/register", userController.register);
api.post("/login", userController.login)
api.put("/editUsuario/:idUsuario",authentication.ensureAuth ,userController.editCliente);
api.put("/deleteUsuario/:idUsuario",authentication.ensureAuth ,userController.deleteCliente);
//api.post("/shoppingCart/:idUsuario",authentication.ensureAuth, userController.shoppingCart);

module.exports=api;