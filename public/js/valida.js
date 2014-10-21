function valida(){
  var usuario=document.getElementById("usuario");
  var contra=document.getElementById("contra");
  var contra2=document.getElementById("contra2");
  var nombre = document.getElementById("nombre");
  var apellidos =document.getElementById("apellidos");
  var mail = document.getElementById("mail");
  if(usuario =="" || contra=""||contra2=""||nombre==""||apellidos==""||mail==""){
    alert("no puede haber ningun espacio en blanco");
  }
}