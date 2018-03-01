<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
	<h1>Procesar informacion</h1>
	<?php
		echo "Usuario: " . $_POST["txt-usuario"] . "<br>";
		echo "Contraseña: " .sha1( $_POST["txt-contrasena"]);

		$archivo = fopen("usuarios.txt", "a+");
		fwrite($archivo, $_POST["txt-usuario"]  . ", ". sha1( $_POST["txt-contrasena"]) . "\n");
		fclose($archivo);
	?>
</body>
</html>