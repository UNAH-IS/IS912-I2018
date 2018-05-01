var express = require("express");
var mysql = require("mysql");

var app = express();

var conexion = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"db_9gag"
});

app.get("/",function(peticion, respuesta){
	conexion.query("SELECT * FROM tbl_usuarios", function(err, data, fields){
		respuesta.send(data);
	});
});

app.get("/consulta", function(peticion, respuesta){
	var usuarios = [];
	conexion.query("SELECT * FROM tbl_usuarios")
	.on("result", function(usuario){
		usuarios.push({usuario, comentarios:[]});
		console.log("--------------------");
		console.log(usuario);
	})
	.on("end", function(){
		respuesta.send(usuarios);
	});
});

app.listen(8081);