var express = require("express");
var bodyParser = require("body-parser");
var mysql = require("mysql");

var app = express();
var conexion = mysql.createConnection({
	host:"localhost",
	user:"root",
	password:"",
	database:"telegram_db"
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static("public"));


app.get("/usuarios",function(peticion, respuesta){
    conexion.query(
        "SELECT codigo_usuario as codigo, nombre, fotografia as imagen FROM tbl_usuarios",
        function(err, filas, campos){
            respuesta.send(filas);
        }
    );
});

app.post("/mensajes", function(peticion, respuesta){
	conexion.query(
			"select codigo_usuario_emisor as codigo, mensaje, date_format(fecha_hora,'%H:%i:%S') hora "+
  			"from tbl_mensajes "+
			"where (codigo_usuario_emisor = ? or codigo_usuario_emisor = ?) "+
			"and (codigo_usuario_receptor= ? or codigo_usuario_receptor = ?) ",
			[peticion.body.emisor,peticion.body.receptor,peticion.body.emisor,peticion.body.receptor],
			function(err, filas, campos){
				if (err) throw err;
				respuesta.send(filas);
			}
		);
});

app.post("/enviar-mensaje",  function(peticion, respuesta){
	conexion.query(
			"INSERT INTO tbl_mensajes (codigo_usuario_emisor,codigo_usuario_receptor, mensaje,fecha_hora) "+
    		"VALUES (?, ? ,? , sysdate())",
			[	
				peticion.body.emisor,
				peticion.body.receptor,
				peticion.body.mensaje
			],
			function(err, resultado){
				if (err) throw err;
				resultado.hora = 'HORA X';
				respuesta.send(resultado);
				//respuesta.send("Deberia enviar mensajes");
			}
		);
});

app.post("/eliminar-conversacion",  function(peticion, respuesta){
	conexion.query(
			"DELETE FROM tbl_mensajes "+
			"WHERE (codigo_usuario_emisor = ? and codigo_usuario_receptor = ?) or "+
			" (codigo_usuario_emisor = ? and codigo_usuario_receptor = ?)",
			[	
				peticion.body.emisor,
				peticion.body.receptor,
				peticion.body.receptor,
				peticion.body.emisor
			],
			function(err, resultado){
				if (err) throw err;
				respuesta.send(resultado);
				//respuesta.send("Deberia enviar mensajes");
			}
		);
});


app.listen(3000);