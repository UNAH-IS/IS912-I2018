
<?php
	session_start();
	//echo "[Server]: Usuario: " . $_POST["usuario"] . ", Password:".$_POST["password"];


	$archivo = fopen("usuarios.csv", "r");
	while(($linea=fgets($archivo))){
		//Juan,Perez,jperez@gmail.com,asd.456,3,2,2000,M
		$partes = explode(",", $linea);
		if ($partes[2] == $_POST["usuario"] &&  $partes[3] == $_POST["password"] ){
			$_SESSION["esta-logeado"] = "si";
			fclose($archivo);
			echo "Correcto";
			exit();
		}
	}

	echo "Incorrecto";
	fclose($archivo);
?>