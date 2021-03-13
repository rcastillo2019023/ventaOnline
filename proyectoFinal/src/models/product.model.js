const mongoose =require("mongoose");
var Schema = mongoose.Schema;

var ProductSchema=Schema({
    nombre: String,
    descripcion: String,
    idCategoria: String,
    stock: Number,
    precio: Number
});

module.exports = mongoose.model("Producto", ProductSchema);