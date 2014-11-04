function valida(){
	var ok = false;
	console.log("entro");
  var usuario=document.getElementById("usuario");
  var contra=document.getElementById("contra");
  var contra2=document.getElementById("contra2");
  if(usuario =="" || contra=""||contra2=""){
    alert("no puede haber ningun espacio en blanco");
  }else {
  	ok = true;
  }
  return ok;
}