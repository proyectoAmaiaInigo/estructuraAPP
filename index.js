// form
// http://expressjs.com/4x/api.html#req.params
var express = require('express');
var app = express();

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body-parser for POST para pasar datos desde handlebars
// https://github.com/expressjs/body-parser
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// public files
app.use(express.static(__dirname + '/public'));

var validator = require('validator');

//conexión BD
var pg = require('pg');

var client = new pg.Client({
    user: "giudgubrrycvwo",
    password: "nLyDs54DsiPVzvWUO5qykvn6H1",
    database: "d384d5q0rueh4o",
    port: 5432,
    host: "ec2-54-83-199-115.compute-1.amazonaws.com",
    ssl: true
});

client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }else{
    console.log("conection ok!");
  }
});

//funcion para saber si json vacio o no
function isEmptyJSON(obj) {
  for(var i in obj) { return false; }
  return true;
}

////////////////////////////////

app.get('/', function (req, res) { //si no ponemos res.render, también va a index.handlebars
    //index
    res.render('index');
 });

app.get('/inicio', function (req, res) {    
    res.render('inicio');
 });

//Comprueba si el usuario introducido existe en la BD y si la contraseña introducida es la correcta
app.post('/login',function (req, res) {
    var id = req.body.usuario;
    var contra = req.body.password;
    client.query('SELECT * FROM usuario WHERE email ='+"'"+id+"'",function(err,usuario){
        var respuesta = null;
        if (isEmptyJSON(usuario.rows)) { //si la consulta no devuelve nada, significa que el usuario no existe
            res.send("nombre usuario erroneo");
        } else {
            respuesta = usuario.rows[0];
            var contraBD = (respuesta.contrasena);
            if(contraBD.localeCompare(contra)==0){
                if(id=="admin@admin.com"){ //cuando comprueba que tanto el usuario como la contraseña está bien redirige a la página principal
                    res.redirect('/admin'); // si el usuario introducido es el administrador irá a la parte /admin
                }else{
                    res.redirect('/inicio'); //sino irá al inicio
                }
            }else{
                res.send("usuario ok y contraseña mal");                
            }
        }
    });
});

app.post('/registro', function (req, res) { //añade un usuario a la BD
    
    var id = req.body.mail;
    var contra = req.body.contra;
    
    client.query('SELECT * FROM usuario WHERE email ='+"'"+id+"'",function(err,usuario){
        var respuesta = null;
        if (isEmptyJSON(usuario.rows)) { //si la consulta no devuelve nada, significa que el usuario no existe
            var sql = 'INSERT INTO usuario VALUES (\''+id+'\', \''+contra+'\');';

            console.log(sql);

            client.query(sql,function(error , result){
                //si la insert no da ningún error, la página redirecciona a index para introducir los datos.
                if (error) {
                    console.log(error);
                } else {
                    res.render('index');
                }
            });            
        } else {
            res.send("ese mail ya está dado de alta");
        }
    });
});


app.get('/artistas', function (req, res) { //lista los artistas que hay dentro de la BD

    var artista = {};

    client.query('SELECT nombre FROM grupo',function(err,grupo){
        
        if (isEmptyJSON(grupo.rows)) { //si la consulta no devuelve nada, significa que no hay artistas en la BD
            res.send("No existen artistas");
        } else {
            console.log(grupo.rows);
            artista={
                    artista: grupo.rows
            };

            res.render('listas', artista);         
        }
    });

 });

app.get('/localidades', function (req, res) {   //lista las localidades que hay en la BD

    var localidades = {};

    client.query('SELECT localizacion FROM conciertos',function(err,localidad){
        localidades={
                localidades: localidad.rows
        };
        res.render('listas', localidades);
    });
 });


/***************************************administracion***************************************/
app.get('/admin', function (req, res) {  
    res.render('admin');
 });

app.get('/goanadir', function (req, res) {
            res.render('anadir');
 });

app.post('/anadir', function (req, res) {  //añadimos conciertos a la BD, la id de los conciertos se pasa automaticamente

    
    var fecha = req.body.fecha;
    var hora = req.body.hora;
    var precio = req.body.precio;
    var descripcion = req.body.descripcion;
    var loc = req.body.localizacion;

    var sql = 'INSERT INTO conciertos VALUES (DEFAULT, \''+fecha+'\', \''+hora+'\', \''+precio+'\', \''+descripcion+'\', \''+loc+'\');';

        console.log(sql);

        client.query(sql,function(error , result){
            
            if (error) {
                console.log(error);
            } else {
                res.render('anadir');
            }
    }); 
    
 });

app.get('/goborrar', function (req, res) {  
    var localidades = {};

    client.query('SELECT localizacion FROM conciertos',function(err,localidad){
        localidades={
                localidades: localidad.rows
        };
        res.render('borrar', localidades);
    });
 });

app.post('/borrar', function (req, res) {  

    var loc = req.body.localidad;
    console.log(loc);
    var localidades = {};

    client.query('delete FROM conciertos where localizacion ='+"'"+loc+"'",function(err,localidad){
            console.log("borrado!");
            console.log(err);
            res.render('borrar', localidades);
    });
 });
/*
app.get('/gomodificar', function (req, res) {  
    var conciertos = {};

    client.query('SELECT * FROM conciertos',function(err,localidad){
            conciertos={
                    conciertos: localidad.rows
            };
            res.render('modificar', conciertos);
    });
 });

app.post('/modificar', function (req, res) {  
    console.log("dentro");
    var loc = req.body.localidad;
    console.log(loc);
    var conciertos = {};

    client.query('select * FROM conciertos where localizacion ='+"'"+loc+"'",function(err,localidad){
            if (isEmptyJSON(localidad.rows)) { //si la consulta no devuelve nada, significa que el concierto no existe
            res.send("No existen conciertos");
        } else {
            conciertos={
                    conciertos: localidad.rows
            };
            console.log(conciertos);
            res.render('editar', conciertos);         
        }
    });
 });
*/

app.get('/golistar', function (req, res) {  
   
    var artista = {};

    client.query('SELECT nombre FROM grupo',function(err,grupo){
        console.log(grupo.rows);
        artista={
                artista: grupo.rows
        };

        res.render('listar', artista);
    });         
 });

/*
//Servidor Cloud9/OpenShift/local
var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080 || 3000, ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
app.listen(port, ip);
console.log('The magic happens on port ' + port);*/



var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});