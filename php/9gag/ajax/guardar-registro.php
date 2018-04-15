<?php

	$archivo = fopen("../data/memes.csv", "a+");

	fwrite($archivo,
			$_POST["codigo"].",".
			$_POST["descripcion"].",".
			$_POST["usuario"].",".
			$_POST["calificacion"].",".
			$_POST["imagen"]."\n");

	fclose($archivo);
	

	echo  	 '<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">'.
				 '  <div class="well">'.
				 '    <strong>'.$_POST["usuario"]. '</strong>'.
				 '    <p>'.$_POST["descripcion"]. '</p>'.
				 '    <img src="'.$_POST["imagen"]. '" class="img-responsive">'.
				 '    <span class="badge">Calificación: ';

		for($i=0;$i<intval($_POST["calificacion"]);$i++)
			echo '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';

		echo '</span>'.
			 '    <span class="badge">Comentarios: 0</span>'.
			 '    <p><hr><h4>Comentarios:</h4>'.
			 '    <div id="div-comentarios-'.$_POST["codigo"].'">';

		echo '</div></p><textarea id="txt-comentario-meme-'.$_POST["codigo"].'"class="form-control" placeholder="Comentario"></textarea>'.
			 '<button onclick="comentar('.$_POST["codigo"].');" type="button">Comentar</button>'.
			 '  </div>'.
			 '</div>';

?>