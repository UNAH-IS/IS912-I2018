function comentar(codigoMeme){
	var parametros= "codigo-meme="+codigoMeme+"&"+
					"comentario="+$("#txt-comentario-meme-"+codigoMeme).val()+"&"+
					"usuario=" + $('input[name="rbt-usuario"]:checked').val();

	console.log("Informacion a enviar: " + parametros);
	$.ajax({
		url:"ajax/guardar-comentario.php",
		method:"POST",
		data:parametros,
		success:function(respuesta){
			//alert(respuesta);
			//cargarMemes();
			$("#div-comentarios-"+codigoMeme).append(respuesta);
		}
	});
}

function guardarRegistro(){
	var parametros = 
	"codigo="+$("#txt-codigo").val()+"&"+
	"descripcion="+$("#txt-descripcion").val()+"&"+
	"calificacion="+$("#txt-calificacion").val()+"&"+
	"imagen="+$("#slc-imagen").val()+"&"+
	"usuario="+$("input[name='rbt-usuario']:checked").val();
	console.log(parametros);
	$.ajax({
		url:"ajax/guardar-registro.php",
		method:"POST",
		data:parametros,
		success:function(respuesta){
			//console.log(respuesta);
			$("#div-memes").append(respuesta);
		}
	});
}

$(document).ready(function(){
	//El DOM esta cargado"
	$.ajax({
		url:"ajax/obtener-usuarios.php",
		success:function(respuesta){
			$("#div-usuarios").html(respuesta);
		}
	});

	cargarMemes();
});


function cargarMemes(){
	$.ajax({
		url:"ajax/obtener-memes.php",
		success:function(respuesta){
			$("#div-memes").html(respuesta);
		}
	});
}