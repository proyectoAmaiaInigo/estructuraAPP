function valida(){
  var usuario=trim(document.getElementById("usuario"));
  var contra=trim(document.getElementById("contra"));
  var contra2=trim(document.getElementById("contra2"));
  if(usuario =="" || contra=""||contra2=""||nombre==""||apellidos==""||mail==""){
    alert("no puede haber ningun espacio en blanco");
  }else{
  	if(usuario.length<6 || usuario.length>){
  		alert("El usuario debe tener como mínimo 6 caracteres y como máximo 15.");
  	}else{
  		if(contra != contra2){
  			alert("Las contraseñas no existen");
  		}
  	}
  }
}
function trim(cadena){
       cadena=cadena.replace(/^\s+/,'').replace(/\s+$/,'');
       return(cadena);
}