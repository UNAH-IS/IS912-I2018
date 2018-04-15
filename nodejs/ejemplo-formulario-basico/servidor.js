var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function(peticion, respuesta){
	console.log("Se recibio una peticion");
	var detalleURL = url.parse(peticion.url, true);//true se utiliza para poder acceder a cada parametro del GET
	if (detalleURL.pathname == '/form'){
		fs.readFile("./formulario.html",function(err, data){
			respuesta.writeHead(200, {"Content-Type":"text/html"});
			respuesta.write(data);
			respuesta.end();
		});
	}else if (detalleURL.pathname == '/procesar'){
		respuesta.writeHead(200, {"Content-Type":"text/html"});
		respuesta.write("<html><body><h1>Parametros: "+detalleURL.query.usuario+", Password:"+detalleURL.query.password+"</h1></body></html>");
		respuesta.end();	
	}else{
		respuesta.writeHead(404, {"Content-Type":"text/html"});
		respuesta.end("Recurso no encontrado");
	}
	/*
			respuesta.write("<html><body>"+
			"URL: "+peticion.url+"<br>"+
			"PathName: "+detalleURL.pathname+"<br>"+
			"Parametro: "+detalleURL.query.parametro+"<br>"+
			"</body></html>");
	*/
}).listen(3000);

console.log("Servidor levantado, esperando peticiones");