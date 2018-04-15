<?php 
	$variable = 10;

?>

<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<?php

		//Comentario de una linea
		/*
		Comentario de multiples lineas
		*/
		#Comentario de una linea
		//int a = 1;
		$a = 1;
		$a = "Pedro";
		$arreglo = array();
		$arreglo[0] = 4444;
		$arreglo[1] = 555;
		$arreglo["nombre"] = "Juan";
		$arreglo["apellido"] = "Perez";
		$arreglo[1]["nombre"] = "Pedro";
		$arreglo[]=666;

		for ($i = 0;$i<50;$i++)
			echo "<b>Hola " . $a . "</b><br>\n";


		echo $variable;
	?>
</body>
</html>