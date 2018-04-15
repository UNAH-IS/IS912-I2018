<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<div id= "contenido"></div>
	<?php
		echo "Hola mundo desde PHP <br>";
	?>


	<script>
		//Comentario de una linea
		/*
			Comentarios de multiple linea
		*/	

		//Con document accede al DOM (Document Object Model)
		var nombre = "Juan";
		//Imprimir una salida dentro del html
		document.write("Hola mundo desde JS");
		//Imprimir una salida en la consola de JS
		console.log("Hola mundo desde JS en la consola");
		//Imprimir una salida usando un cuadro de dialogo
		alert("Hola mundo desde JS utilizando un cuadro de dialogo");
		//Imprimir una salida dentro del html interno de una etiqueta.
		document.getElementById("contenido").innerHTML = "Hola mundo, valor asignado dinamicamente dentro de un div";

	</script>
	<script src="js/prueba.js"></script>
</body>
</html>