<?php
	$archivo = fopen("../data/memes.csv","r");	
	while ($linea=fgets($archivo)) {
		$partes = explode(",", $linea);
		echo  	 '<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">'.
				 '  <div class="well">'.
				 '    <strong>'.$partes[2]. '</strong>'.
				 '    <p>'.$partes[1]. '</p>'.
				 '	<button type="button" class="btn btn-rpimary" onclick="editarMeme('.$partes[0].');">Editar</button>'.
				 '    <img src="'.$partes[4]. '" class="img-responsive">'.
				 '    <span class="badge">Calificación: ';

		for($i=0;$i<intval($partes[3]);$i++)
			echo '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';

		echo '</span>'.
			 '    <span class="badge">Comentarios: 0</span>'.
			 '    <p><hr><h4>Comentarios:</h4>'.
			 '    <div id="div-comentarios-'.$partes[0].'">';

		//Leer los comentarios:
		if (file_exists("../data/comentarios/comentarios-meme-".$partes[0].".csv")){
			$archivoComentarios = fopen("../data/comentarios/comentarios-meme-".$partes[0].".csv", "r");		
			while(($lineaComentario=fgets($archivoComentarios))){
				$partesComentario = explode(",",$lineaComentario);
				 echo  '<div><strong>'.$partesComentario[0].'</strong><p class="commentario">'.$partesComentario[1]. '</p></div>';
			}
			fclose($archivoComentarios);
		}

		echo 	'</div></p><textarea id="txt-comentario-meme-'.$partes[0].'"class="form-control" placeholder="Comentario"></textarea>'.
			 '<button onclick="comentar('.$partes[0].');" type="button">Comentar</button>'.
			 '  </div>'.
			 '</div>';
	}
	fclose($archivo);
?>
