"use strict"

const express=require("express");
const categoryController=require("../controllers/category.controller")

var authentication=require("../middleswares/authenticated");

var api=express.Router();
api.post("/createCategory/:idAdmin", authentication.ensureAuth, categoryController.createCategory);
api.put("/editCategory/:idAdmin",authentication.ensureAuth ,categoryController.editCategory);
api.put("/deleteCategory/:idAdmin",authentication.ensureAuth ,categoryController.deleteCategory)

module.exports=api;