/*function validar(){

}*/


var validar = function(){
	if (document.getElementById("txt-nombre").value == ""){
		document.getElementById("txt-nombre").classList.remove("is-valid");
		document.getElementById("txt-nombre").classList.add("is-invalid");
	}
	else{
		document.getElementById("txt-nombre").classList.remove("is-invalid");
		document.getElementById("txt-nombre").classList.add("is-valid");
	}
}