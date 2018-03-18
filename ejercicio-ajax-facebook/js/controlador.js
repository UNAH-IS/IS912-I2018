function validar(){
	validarCampoVacio("txt-nombre");
	validarCampoVacio("txt-apellido");
	validarCampoVacio("txt-correo");
}


var validarCampoVacio = function(id){
	if (document.getElementById(id).value == ""){
		document.getElementById(id).classList.remove("is-valid");
		document.getElementById(id).classList.add("is-invalid");
	}
	else{
		document.getElementById(id).classList.remove("is-invalid");
		document.getElementById(id).classList.add("is-valid");
	}
}

function validarContrasena(etiqueta){
	if (etiqueta.value.length <6){
		etiqueta.classList.remove("is-valid");
		etiqueta.classList.add("is-invalid");
	}
	else{
		etiqueta.classList.remove("is-invalid");
		etiqueta.classList.add("is-valid");
	}
}


function validarCorreo(etiquetaEmail) {
    var patron = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(patron.test(String(etiquetaEmail.value).toLowerCase())){
		etiquetaEmail.classList.remove("is-invalid");
    	etiquetaEmail.classList.add("is-valid");
    }else{
    	etiquetaEmail.classList.remove("is-valid");
    	etiquetaEmail.classList.add("is-invalid");
    }
}

$("#btn-signup").click(function(){
	$("#btn-signup").prop("disabled",true);
	$("#btn-signup").html('<i class="fas fa-circle-notch fa-spin"></i> Cargando');
	//$("#div-respuesta").html('<i class="fas fa-circle-notch fa-spin"></i><img src="img/loading.gif">');
	validar();
	var parametros = 
		"nombre="+$("#txt-nombre").val() +
		"&apellido="+$("#txt-apellido").val() +
		"&correo="+$("#txt-correo").val() +
		"&contrasena="+$("#txt-contrasena").val() +
		"&dia="+$("#slc-dia").val() +
		"&mes="+$("#slc-mes").val() +
		"&anio="+$("#slc-anio").val() +
		"&genero="+$("input[name='rbt-genero']:checked").val();

	console.log("Informacion a enviar: " +parametros);
	$.ajax({
		url:"ajax/procesar-usuarios.php",
		method:"POST",
		data: parametros,
		success:function(respuesta){
			//$("#div-respuesta").html(respuesta);
			$("#btn-signup").html('Crear cuenta');
			$("#btn-signup").prop("disabled",false);
			$("#formulario").fadeOut(100, function(){
				$("#div-post-login").fadeIn(100);
			});
			
		}
	});
});


$("#btn-login").click(function(){
	var parametros =
			"usuario="+$("#txt-login-usuario").val()+
			"&password="+$("#txt-login-password").val();

	console.log(parametros);

	$.ajax({
		url:"ajax/procesar-login.php",
		method:"POST",
		data:parametros,
		success:function(respuesta){
			console.log(respuesta);
			if (respuesta =="Correcto")
				window.location = "main.php";//Redireccionar a la pantalla de bienvenida
			else
				alert("Credenciales incorrectas");
		}
	});
});