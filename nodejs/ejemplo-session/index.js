var express = require("express");
var session = require("express-session");
var app = express();

app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

app.get("/establecer-sesion/:mensaje", function(peticion, respuesta){
    peticion.session.mensaje = peticion.params.mensaje;
    respuesta.send("Se guardo la variable de sesion");
});

app.get("/obtener-sesion", function(peticion, respuesta){
   respuesta.send("Valor de la variable de sesion almacenado: " + peticion.session.mensaje);
});

app.get("/destruir-sesion",function(peticion, respuesta){
	peticion.session.destroy();
	respuesta.send("Sesion eliminada");
});

app.listen(3000);