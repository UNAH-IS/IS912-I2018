var express = require("express");
var app = express();

/*
app.METODO("URL",function(peticion, respuesta)){

}
*/
app.use(express.static("public"));

app.get("/", function(peticion, respuesta){
	respuesta.send(
		'<html><head><link rel="stylesheet" type="text/css"  href="css/estilos.css"></head>'+
		"<body><h1>Hola mundo utilizando express</h1></body></html>"
	);
});

app.get("/pagina1", function(peticion, respuesta){
	respuesta.send("Esta es la pagina uno");
});

app.get("/pagina2", function(peticion, respuesta){
	respuesta.send("Esta es la pagina dos");
});

app.get("/ab*cd", function(peticion, respuesta){
	respuesta.send("La peticion cumple con el patro ab*cd");
});

app.listen(3000);