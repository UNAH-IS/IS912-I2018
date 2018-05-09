var express = require("express");
var app = express();
var usuario = require("./usuario");
var matricula = require("./matricula");

app.use("/usuario",usuario);
app.use("/matricula",matricula);

app.get("/",function(peticion, respuesta){
	respuesta.send("Hola mundo con express");
});

app.listen(3000);