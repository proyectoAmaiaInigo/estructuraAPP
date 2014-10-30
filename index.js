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

// database example
// http://sequelizejs.com/articles/getting-started

// https://www.npmjs.org/package/validator
var validator = require('validator');

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

app.get('/', function (req, res) {
    //index
    res.render('index');
 });

app.post('/login',function (req, res) {

    var id = req.body.usuario;
    var contra = req.body.password;
    client.query('SELECT * FROM usuario WHERE email ='+"'"+id+"'").success(function(usuario){

       // console.log(usuario);
    
        if (usuario.length==0) {
            res.send("nombre usuario erroneo");
        } else {
            var contraBD = (usuario[0].contrasena);
            console.log(usuario[0].contrasena);
            console.log(contra);
            if(contraBD.localeCompare(contra)==0){
                //res.send("usuario y contraseña ok");
                res.render('noticias');
            }else{
                res.send("usuario ok y contraseña ko");
                
            }
        }
    });
});
app.post('/registro', function (req, res) {
    
    console.log("dentro");
    var id = req.body.mail;
    var contra = req.body.contra;
    console.log("dentro1");

    var sql = 'INSERT INTO usuario VALUES (\''+id+'\', \''+contra+'\');';

    console.log(sql);

    client
    .query(sql, null, {raw:true})

    .success(function(rows){
        // no errors
        // console.log({"msg":"insert OK", "sql":sql});
        // res.json({"msg":"insert OK", "sql":sql});delimiter $$
        res.render('index');
        // res.json(JSON.stringify(rows));
    });

});
var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
