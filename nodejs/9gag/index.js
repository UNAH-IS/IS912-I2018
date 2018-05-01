var express = require("express");
var mysql = require("mysql");
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');
var credenciales = {
    user:"root",
    password:"",
    host:"localhost",
    database:"db_9gag",
    port:"3306"
};

app.use(express.static("public"));
//Estos midlewares sirven para convertir el contenido de una peticion post en un arreglo JSON
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies



app.get("/",function(peticion, respuesta){
	//respuesta.send("Este es el proyecto de 9gag (Modificado)");
});

app.get("/obtener-usuarios",function(peticion, respuesta){
	var conexion = mysql.createConnection(credenciales);
	conexion.query("SELECT * from tbl_usuarios", function(error, informacion, campos){
		//console.log(informacion);
		conexion.end();
		respuesta.send(informacion);
	});
});



app.get("/obtener-memes", function(peticion, respuesta){	
	var conexion1 = mysql.createConnection(credenciales);
    var conexion2 = mysql.createConnection(credenciales);
    var memes = [];
    var sql = "SELECT codigo_meme, descripcion, fecha_publicacion,"+
    "calificacion, url_imagen, a.codigo_usuario, b.nombre "+
    "FROM tb_memes a "+
    "INNER JOIN tbl_usuarios b "+
    "ON (a.codigo_usuario = b.codigo_usuario)";
    conexion1.query(sql)
    .on('result', function(meme){
        meme.comentarios=[];
        memes.push(meme);
        conexion1.pause();
        conexion2.query("SELECT codigo_comentario, descripcion, fecha_publicacion,"+
                " codigo_usuario, codigo_meme FROM tbl_comentarios "+
                "WHERE codigo_meme=?",[meme.codigo_meme])
        .on('result', function(comentario){
            meme.comentarios.push(comentario);
        })
        .on('end',function(){
            conexion1.resume();
        });
    })
    .on('end',function(){
        conexion1.end();
        conexion2.end();
        respuesta.send(memes);
    });
});

app.post("/guardar-registro", function(peticion, respuesta){
	//Body es un JSON con todos los parametros en post
	var conexion = mysql.createConnection(credenciales);
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
						conexion.end();
						respuesta.send(informacion);		
					}
				);
			}
			
		});
});

app.post("/actualizar-registro", function(peticion, respuesta){
	var conexion = mysql.createConnection(credenciales);
	conexion.query(
		'UPDATE tb_memes SET '+
		'	descripcion=?, fecha_publicacion=sysdate(), calificacion=?, '+
		'	url_imagen=?, codigo_usuario=?  '+
		'WHERE codigo_meme=?', 
		[
			peticion.body.descripcion,
			peticion.body.calificacion,
			peticion.body.imagen,
			peticion.body.usuario,
			peticion.body.codigo
		],
		function(error, resultado){
			if (resultado.affectedRows==1){
				conexion.query("SELECT codigo_meme, descripcion, fecha_publicacion,"+
				"calificacion, url_imagen, a.codigo_usuario, b.nombre "+
				"FROM tb_memes a "+
				"INNER JOIN tbl_usuarios b "+
				"ON (a.codigo_usuario = b.codigo_usuario)"+
				" WHERE a.codigo_meme = ? ",
					[peticion.body.codigo],
					function(errorSelect, informacion, campos){
						if (errorSelect) throw errorSelect;
						conexion.end();
						respuesta.send(informacion);		
					}
				);
			}
			
		});
})

app.post("/seleccionar-meme", function(peticion, respuesta){
	var conexion = mysql.createConnection(credenciales);
	conexion.query("SELECT codigo_meme, descripcion, fecha_publicacion,"+
		"calificacion, url_imagen, a.codigo_usuario, b.nombre "+
		"FROM tb_memes a "+
		"INNER JOIN tbl_usuarios b "+
		"ON (a.codigo_usuario = b.codigo_usuario)"+
		" WHERE a.codigo_meme = ? ",
		peticion.body.codigoMeme,
		function(errorSelect, informacion, campos){
			if (errorSelect) throw errorSelect;
			conexion.end();
			respuesta.send(informacion);		
		}
	);
});

app.listen(3000);