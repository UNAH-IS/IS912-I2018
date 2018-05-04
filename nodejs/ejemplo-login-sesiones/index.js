var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var mysql = require("mysql");
var app = express();
var credenciales ={
  user:"root",
  password:"",
  database:"db_login",
  host:"localhost",
  port:"3306"  
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));
app.use(session({secret:"ASDFE$%#%",resave:true, saveUninitialized:true}));

app.post("/login", function(peticion, respuesta){
    var conexion = mysql.createConnection(credenciales);
    respuesta.send(peticion.body);
    /*conexion.query("",function(err, data, fields){
        peticion.session.mensaje = peticion.params.mensaje;
        respuesta.send("Se guardo la variable de sesion");    
    }); */   
});

app.get("/obtener-sesion", function(peticion, respuesta){
   respuesta.send("Valor de la variable de sesion almacenado: " + peticion.session.mensaje);
});

app.get("/destruir-sesion",function(peticion, respuesta){
	peticion.session.destroy();
	respuesta.send("Sesion eliminada");
});

app.listen(3000);