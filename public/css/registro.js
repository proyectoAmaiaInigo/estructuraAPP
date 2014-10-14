function valida(f) {
        var usuario= document.getElementById("usuario");
        var contra= document.getElementById("contra");
        var contra2= document.getElementById("contra2");
        var mail= document.getElementById("mail");
        var sexo= document.getElementById("sexo");
        var nombre= document.getElementById("nombre");
        var apellidos= document.getElementById("apellidos");
        if(usuario == "" || contra == "" || contra2="" || mail == "" || !sexo.checked || nombre=="" || apellidos == "") {
          alert("No puede haber ningún campo vacío");
        }else{
          //validación usuario
          if(usuario.length <2 || usuario.length>16){
            alert("El usuario tiene que tener como mínimo 3 caracteres y como máximo 15");
          }else{
            /*código validación BD con usuarios*/
          }
          //validación contraseña
          if()

        }
      }
function verRegistro(f){
  alert("FUNCIONA");
}