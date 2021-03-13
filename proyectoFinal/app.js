"usestrict"

//Variables globales
const express=require("express");
const app =express();
const bodyParser=require("body-parser");
const cors=require("cors");

//Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Cabeceras
app.use(cors());

//Importación rutas  
const user_Routes=require("./src/routes/user.routes");
const category_Routes=require("./src/routes/category.routes");
const product_Routes=require("./src/routes/product.routes");

//Cargar Rutas 
app.use("/apiUser", user_Routes);
app.use("/apiCategory", category_Routes);
app.use("/apiProduct",product_Routes);


//Exportar
module.exports=app;