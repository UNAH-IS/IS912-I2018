<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title></title>
</head>
<body>
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