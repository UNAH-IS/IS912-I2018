var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var app = express();

app.use(cookieParser());//Utiliza para implementar middlewares

app.get("/establecer-cookies", function(peticion, respuesta){
    respuesta.cookie("usuario","jperez");
    respuesta.send("Cookie guardada");
});

app.get("/obtener-cookies", function(peticion, respuesta){
    respuesta.send("Valor de la cookie usuario: " + peticion.cookies.usuario);
});

app.listen(3000);