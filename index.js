// form
// http://expressjs.com/4x/api.html#req.params
var express = require('express');
var app = express();

var exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// body-parser for POST
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

app.get('/', function (req, res) {
    //index
    res.render('index');
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
                res.redirect('/inicio'); //cuando comprueba que tanto el usuario como la contraseña está bien redirige a la página principal
            }else{
                res.send("usuario ok y contraseña ko");                
            }
        }
    });
});


app.get('/inicio', function (req, res) {    
    res.render('inicio');
 });

app.post('/registro', function (req, res) {
    
    var id = req.body.mail;
    var contra = req.body.contra;
    
    client.query('SELECT * FROM usuario WHERE email ='+"'"+id+"'",function(err,usuario){
        var respuesta = null;
        if (isEmptyJSON(usuario.rows)) { //si la consulta no devuelve nada, significa que el usuario no existe
            var sql = 'INSERT INTO usuario VALUES (\''+id+'\', \''+contra+'\');';

            console.log(sql);

            client.query(sql,function(error , result){
                
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



// pruebaaa JASON
app.get('/artistas', function (req, res) {

    var artista = {};

    client.query('SELECT nombre FROM grupo',function(err,grupo){
        
        if (isEmptyJSON(grupo.rows)) { //si la consulta no devuelve nada, significa que el usuario no existe
            res.send("No existen artistas");
        } else {
            console.log(grupo.rows);
            artista={
                    artista: [ { nombre: 'Izal' },
                                  { nombre: 'Crystal Fighters' },
                                  { nombre: 'Lana del Rey' },
                                  { nombre: 'Vetusta Morla' },
                                  { nombre: 'Lori Meyers' },
                                  { nombre: 'Supersubmarina' },
                                  { nombre: 'Shakira' },
                                  { nombre: 'Beyonce' },
                                  { nombre: 'Amaral' },
                                  { nombre: 'Alt-J' },
                                  { nombre: 'Imagine Dragons' },
                                  { nombre: 'Arcade Fire' },
                                  { nombre: 'Two Door Cinema Club' },
                                  { nombre: 'MGMT' },
                                  { nombre: 'Biffy Clyro' },
                                  { nombre: 'Dorian' },
                                  { nombre: 'Foster the people' },
                                  { nombre: 'Phoenix' },
                                  { nombre: 'The Lumineers' },
                                  { nombre: 'Vance Joy' }
            ]
            };

            res.render('prueba', artista);         
        }
    });

 });

app.get('/localidades', function (req, res) {  

    // client.query('SELECT * FROM artistas ,function(err,localidades){
           // localidades.rows[0].nombre

    var localidad = {
                 localidad: [
                        {nombre: 'Barcelona'},
                        {nombre: 'Madrid'},
                        {nombre: 'Donostia'},
                        {nombre: 'Bilbao'}
                        ]};
    res.render('prueba2', localidad);  
 });





var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
