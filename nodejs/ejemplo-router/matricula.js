var express = require("express");
var router = express.Router();

router.get("/",function(peticion, respuesta){
	respuesta.send("GET desde el enrutador de matricula");
});

router.get("/cancelar/:cuenta",function(peticion, respuesta){
	respuesta.send("Cancelar la matricula para " + peticion.params.cuenta);
});

module.exports = router;