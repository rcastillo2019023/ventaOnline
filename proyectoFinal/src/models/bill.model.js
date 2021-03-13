const mongoose =require("mongoose");
var Schema = mongoose.Schema;

var BillSchema=Schema({
    nombre: String,
    nit: String,
    
});

module.exports = mongoose.model("Category", BillSchema);