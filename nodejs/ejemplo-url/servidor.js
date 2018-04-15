var http = require("http");
var url = require("url");
var fs = require("fs");

http.createServer(function(peticion, respuesta){
	console.log("Se recibio una peticion");
	var detalleURL = url.parse(peticion.url, true);//true se utiliza para poder acceder a cada parametro del GET
	if (detalleURL.pathname == '/pagina1'){
		respuesta.writeHead(200, {"Content-Type":"text/html"});
		respuesta.write("<html><body><h1>Esta es la página 1</h1></body></html>");
		respuesta.end();	
	}else if (detalleURL.pathname == '/pagina2'){
		respuesta.writeHead(200, {"Content-Type":"text/html"});
		respuesta.write("<html><body><h1>Esta es la página 2</h1></body></html>");
		respuesta.end();	
	}else if (detalleURL.pathname == '/pagina3'){
		fs.readFile("./pagina3.html",function(err, data){
			respuesta.writeHead(200, {"Content-Type":"text/html"});
			respuesta.write(data);
			respuesta.end();
		});
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