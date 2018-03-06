<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<body>
	<?php 
		var_dump($_GET);
		echo "Nombre: " . $_GET["txt-nombre"] . "<br>";
		echo "Gusto 0: " . $_GET["chk-gustos"][0] . "<br>";
		echo "Pais 1: " . $_GET["slc-paises"][1] . "<br>";

	?>
</body>
</html>