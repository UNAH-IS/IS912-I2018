<?php
	if (isset($_POST)){
		if (isset($_POST["btn-login"]))	{
			echo "Usuario: " . $_POST["txt-usuario"] . "<br>";
			echo "Contraseña: " .sha1( $_POST["txt-contrasena"]);

			$archivo = fopen("usuarios.csv", "a+");
			fwrite($archivo, $_POST["txt-usuario"]  . ", ". sha1( $_POST["txt-contrasena"]) . "\n");
			fclose($archivo);
			echo "<br><b>Se guardo el registro<b><br>";
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Formulario</title>
</head>
<body>
	<form action="index.php" method="POST">
		<input name="txt-usuario" type="text" placeholder="Usuario">
		<input name="txt-contrasena" type="password" placeholder="Contraseña"><br>
		<input name="btn-login" type="submit" value="Ingresar">
	</form>
	<hr>

	<table border="1" cellspacing="0">
		<tr>
			<th>Usuario</th>
			<th>Contraseña</th>
		</tr>
		<?php
			$archivo = fopen("usuarios.csv","r");
			while(($linea = fgets($archivo))){
				$partes = explode(",", $linea);
				echo '<tr><td>' . $partes[0] .'</td><td>'.$partes[1] .'</td><td><a href="eliminar.php?usuario='.$partes[0].'">Eliminar</a></td></tr>';
			}
		?>
		
	</table>
</body>
</html>