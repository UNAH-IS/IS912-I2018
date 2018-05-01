var express = require("express");
var mysql = require("mysql");
var app = express();


var credenciales = {
    user:"root",
    password:"",
    host:"localhost",
    database:"db_9gag",
    port:"3306"
};

app.get("/", function(peticion, respuesta){
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

app.listen(3000);
