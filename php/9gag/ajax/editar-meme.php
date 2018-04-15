<?php
	$respuesta = array();
	$archivo = fopen("../data/memes.csv", "r");
	while(($linea=fgets($archivo))){
		$partes = explode(",", $linea);
		if ($partes[0]==$_POST["codigo-meme"]){
			//echo $linea;
			//1,Lorem ipsum,Goku,1,img/memes/meme_01.jpg
			$respuesta["descripcion"] = $partes[1];
			$respuesta["usuario"] = $partes[2];
			$respuesta["calificacion"] = $partes[3];
			$respuesta["urlImagen"] = $partes[4];
			$respuesta["codigoMeme"] = $partes[0];
			//var_dump($respuesta);
			echo json_encode($respuesta);
			exit;
		}
	}
	echo "No se encontro el registro";
?>