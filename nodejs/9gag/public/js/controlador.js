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
	console.log("El cliente envía esto: "+ parametros);
	$.ajax({
		url:"/guardar-registro",
		method:"POST",
		data:parametros,
		success:function(respuesta){
			console.log("El servidor responde con esto: ");
			console.log(respuesta);
			var contenido = 
				'<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12">'+
				'  <div class="well">'+
				'    <strong>'+respuesta[0].nombre+ '</strong>'+
				'    <p>'+respuesta[0].descripcion+'</p>'+
				'	<button type="button" class="btn btn-rpimary" onclick="editarMeme('+respuesta[0].codigo_meme+');">Editar</button>'+
				'    <img src="'+respuesta[0].url_imagen+ '" class="img-responsive">'+
				'    <span class="badge">Calificación: ';

				for(var j=0;j<respuesta[0].calificacion;j++)
					contenido += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';

				contenido += '</span>'+
					'    <span class="badge">Comentarios: 0</span>'+
					'    <p><hr><h4>Comentarios:</h4>'+
					'    <div id="div-comentarios-'+respuesta[0].codigo_meme+'">';

				//Aqui van los comentarios

				contenido += '</div></p><textarea id="txt-comentario-meme-'+respuesta[0].codigo_meme+'"class="form-control" placeholder="Comentario"></textarea>'+
			 		'<button onclick="comentar('+respuesta[0].codigo_meme+');" type="button">Comentar</button>'+
			 		'  </div>'+
					 '</div>';
					 
				$("#div-memes").append(contenido);
		}
	});
}

$(document).ready(function(){
	//El DOM esta cargado"
	//alert("");
	console.log("Ejecutar peticion AJAX a obtener-usuarios");
	$.ajax({
		url:"/obtener-usuarios",
		dataType:"json",
		success:function(respuesta){
			console.log(respuesta);
			for (var i=0; i< respuesta.length; i++){
				$("#div-usuarios").append('<label>'+respuesta[i].nombre+'<input type="radio" value="'+respuesta[i].codigo_usuario+'" name="rbt-usuario"><img src="'+respuesta[i].fotografia+'" class="img-responsive img-circle"></label>');	
			}		
		}
	});

	cargarMemes();
});


function cargarMemes(){
	console.log("Se cargaran los memes");
	$.ajax({
		url:"/obtener-memes",
		success:function(respuesta){
			console.log(respuesta);
			for (var i = 0; i<respuesta.length; i++){
				var contenido = "";
				contenido += 
				'<div class="col-lg-12 col-sm-12 col-xs-12 col-md-12" id="div-meme-'+respuesta[i].codigo_meme+'">'+
				'  <div class="well">'+
				'    <strong>'+respuesta[i].nombre+ '</strong>'+
				'    <p>'+respuesta[i].descripcion+'</p>'+
				'	<button type="button" class="btn btn-rpimary" onclick="editarMeme('+respuesta[i].codigo_meme+');">Editar</button>'+
				'    <img src="'+respuesta[i].url_imagen+ '" class="img-responsive">'+
				'    <span class="badge">Calificación: ';

				for(var j=0;j<respuesta[i].calificacion;j++)
					contenido += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';

				contenido += '</span>'+
					'    <span class="badge">Comentarios: 0</span>'+
					'    <p><hr><h4>Comentarios:</h4>'+
					'    <div id="div-comentarios-'+respuesta[i].codigo_meme+'">';

				//Aqui van los comentarios
				for (var j=0; j< respuesta[i].comentarios.length;j++)
					contenido += '<div>'+respuesta[i].comentarios[j].descripcion+'</div>';

				contenido += '</div></p><textarea id="txt-comentario-meme-'+respuesta[i].codigo_meme+'"class="form-control" placeholder="Comentario"></textarea>'+
			 		'<button onclick="comentar('+respuesta[i].codigo_meme+');" type="button">Comentar</button>'+
			 		'  </div>'+
					 '</div>';
					 
				$("#div-memes").append(contenido);
			}
			
		}
	});
}

function editarMeme(codigoMeme){
	$.ajax({
		url:"seleccionar-meme",
		data:"codigoMeme="+codigoMeme,
		method:"POST",
		dataType:"json",
		success:function(respuesta){
			$("#txt-codigo").val(respuesta[0].codigo_meme);
			$("#txt-descripcion").val(respuesta[0].descripcion);
			$("#txt-calificacion").val(respuesta[0].calificacion);
			$("#slc-imagen").val(respuesta[0].url_imagen);
			$("input[name='rbt-usuario'][value='"+respuesta[0].codigo_usuario+"']").attr("checked","checked");

			$("#btn-guardar").hide();
			$("#btn-actualizar").show();
			$("#btn-cancelar").show();

			$("#txt-codigo").attr("disabled",true);

			console.log(respuesta);
		},
		error:function(error){
			console.log(error);
		}
	});
}

$("#btn-cancelar").click(function(){
			$("#btn-guardar").show();
			$("#btn-actualizar").hide();
			$("#btn-cancelar").hide();	
			$("#txt-codigo").val(null);
			$("#txt-descripcion").val(null);
			$("#txt-calificacion").val(null);
			$("#slc-imagen").val(null);
			$("input[name='rbt-usuario']").attr("checked",false);
			$("#txt-codigo").attr("disabled",false);
});


$("#btn-actualizar").click(function(){
	console.log("Se actualizara el registro con codigo: " + $("#txt-codigo").val());
	var parametros = 
	"codigo="+$("#txt-codigo").val()+"&"+
	"descripcion="+$("#txt-descripcion").val()+"&"+
	"calificacion="+$("#txt-calificacion").val()+"&"+
	"imagen="+$("#slc-imagen").val()+"&"+
	"usuario="+$("input[name='rbt-usuario']:checked").val();
	console.log("El cliente envía esto: "+ parametros);
	$.ajax({
		url:"/actualizar-registro",
		method:"POST",
		data:parametros,
		success:function(respuesta){
			console.log(respuesta);
			var contenido = 
				'  <div class="well">'+
				'    <strong>'+respuesta[0].nombre+ '</strong>'+
				'    <p>'+respuesta[0].descripcion+'</p>'+
				'	<button type="button" class="btn btn-rpimary" onclick="editarMeme('+respuesta[0].codigo_meme+');">Editar</button>'+
				'    <img src="'+respuesta[0].url_imagen+ '" class="img-responsive">'+
				'    <span class="badge">Calificación: ';

				for(var j=0;j<respuesta[0].calificacion;j++)
					contenido += '<span class="glyphicon glyphicon-star" aria-hidden="true"></span>';

				contenido += '</span>'+
					'    <span class="badge">Comentarios: 0</span>'+
					'    <p><hr><h4>Comentarios:</h4>'+
					'    <div id="div-comentarios-'+respuesta[0].codigo_meme+'">';

				//Aqui van los comentarios

				contenido += '</div></p><textarea id="txt-comentario-meme-'+respuesta[0].codigo_meme+'"class="form-control" placeholder="Comentario"></textarea>'+
			 		'<button onclick="comentar('+respuesta[0].codigo_meme+');" type="button">Comentar</button>'+
					 '  </div>';
				
				$("#div-meme-"+respuesta[0].codigo_meme).html(contenido);
		}
	});
});