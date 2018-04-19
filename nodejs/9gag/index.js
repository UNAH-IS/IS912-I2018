var express = require("express");
var mysql = require("mysql");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

app.use(express.static("public"));
//Estos midlewares sirven para convertir el contenido de una peticion post en un arreglo JSON
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var conexion = mysql.createConnection({
	user:"root",
	host:"localhost",
	password:"",
	port:"3306",
	database:"db_9gag"
});

app.get("/",function(peticion, respuesta){
	//respuesta.send("Este es el proyecto de 9gag (Modificado)");
});

app.get("/obtener-usuarios",function(peticion, respuesta){
	conexion.query("SELECT * from tbl_usuarios", function(error, informacion, campos){
		//console.log(informacion);
		respuesta.send(informacion);
	});
});

app.get("/obtener-memes", function(peticion, respuesta){	
	conexion.query(
		"SELECT codigo_meme, descripcion, fecha_publicacion,"+
		"calificacion, url_imagen, a.codigo_usuario, b.nombre "+
		"FROM tb_memes a "+
		"INNER JOIN tbl_usuarios b "+
		"ON (a.codigo_usuario = b.codigo_usuario)",
		function(error, informacion, campos){
			if (error) throw error;
			//console.log(informacion);
			/*for (var i=0; i< informacion.length; i++){
				console.log("Comentarios del meme con codigo: " + informacion[i].codigo_meme);
				conexion.query("SELECT codigo_comentario, descripcion, fecha_publicacion, "+
				"codigo_usuario, codigo_meme "+
				"FROM tbl_comentarios "+
				"WHERE codigo_meme = " + informacion[i].codigo_meme, 
				function(errorC, informacionC, camposC){
					console.log(informacionC);
				});
			}*/
			respuesta.send(informacion);
		}
	);
});

app.post("/guardar-registro", function(peticion, respuesta){
	//Body es un JSON con todos los parametros en post
	conexion.query(
		"INSERT INTO tb_memes(codigo_meme, descripcion, fecha_publicacion, calificacion, url_imagen, codigo_usuario) "+
		"VALUES (NULL,?,sysdate(),?,?,?)", 
		[
			peticion.body.descripcion,
			peticion.body.calificacion,
			peticion.body.imagen,
			peticion.body.usuario,
		],
		function(error, resultado){
			if (resultado.affectedRows==1){
				conexion.query("SELECT codigo_meme, descripcion, fecha_publicacion,"+
				"calificacion, url_imagen, a.codigo_usuario, b.nombre "+
				"FROM tb_memes a "+
				"INNER JOIN tbl_usuarios b "+
				"ON (a.codigo_usuario = b.codigo_usuario)"+
				" WHERE a.codigo_meme = ? ",
					[resultado.insertId],
					function(errorSelect, informacion, campos){
						if (errorSelect) throw errorSelect;
						respuesta.send(informacion);		
					}
				);
			}
			
		});
});

app.post("/seleccionar-meme", function(peticion, respuesta){
	conexion.query("SELECT codigo_meme, descripcion, fecha_publicacion,"+
		"calificacion, url_imagen, a.codigo_usuario, b.nombre "+
		"FROM tb_memes a "+
		"INNER JOIN tbl_usuarios b "+
		"ON (a.codigo_usuario = b.codigo_usuario)"+
		" WHERE a.codigo_meme = ? ",
		peticion.body.codigoMeme,
		function(errorSelect, informacion, campos){
			if (errorSelect) throw errorSelect;
			respuesta.send(informacion);		
		}
	);
});

app.listen(3000);