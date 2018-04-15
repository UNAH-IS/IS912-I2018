var http = require("http");

http.createServer(function(peticion, respuesta){
	console.log("Se recibio una peticion");
	respuesta.writeHead(200, {"Content-Type":"text/html"});
	respuesta.write("<html><body><h1>Hola Mundo</h1></body></html>");
	respuesta.end();
}).listen(3000);

console.log("Servidor levantado, esperando peticiones");