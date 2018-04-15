var express = require("express");
var app = express();
var fs = require("fs");

app.use(express.static("public"));

app.get("/",function(peticion, respuesta){
	//respuesta.send("Este es el proyecto de 9gag (Modificado)");
});

app.get("/obtener-usuarios",function(peticion, respuesta){
	fs.readFile("./data/usuarios.csv",function(err, data){
		respuesta.send(data);
		/*var lineas = data.split("\n");
		for (var i = 0; i < lineas.length; i++) {
			var partesLinea = lineas[i].split(",");
			for (var j = 0; j < partesLinea.length; j++) {
				console.log(partesLinea[j]);
			}			
		}
		respuesta.send("Esta es la respuesta de obtener usuarios");
		*/
	});	

	/*$archivo = fopen("../data/usuarios.csv", "r");
	while(($linea = fgets($archivo))){
		$partes = explode(",", $linea);
		echo '<label>'.$partes[0].'<input type="radio" value="'.$partes[0].'" name="rbt-usuario"><img src="'.$partes[1].'" class="img-responsive img-circle"></label>';
	}
	fclose($archivo);*/


	
});

app.listen(3000);

