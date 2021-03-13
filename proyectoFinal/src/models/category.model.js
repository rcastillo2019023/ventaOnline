const mongoose =require("mongoose");
var Schema = mongoose.Schema;

var CategorySchema=Schema({
    nombre: String,
    descripcion: String,
});

module.exports = mongoose.model("Category", CategorySchema);