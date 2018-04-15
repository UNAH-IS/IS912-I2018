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


app.listen(8081);