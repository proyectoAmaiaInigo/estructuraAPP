/ form
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


var pg = require('pg');


app.get('/', function (req, res) {
    //index
    res.render('index');
 });

app.post('/login',function (req, res) {

    var id = req.body.usuario;
    var contra = req.body.password;
      pg.connect(process.env.DATABASE_URL, function(err, client, done) {
       client.query('SELECT * FROM usuario WHERE mail=id', function(err, result) {
          done();
          if (err)
           { console.error(err); response.send("Error " + err); }
          else
           { response.send(result.rows); }
        });
      });    
});
app.post('/registro', function (req, res) {
    
    var id = req.body.usuarioform;
    var contra = req.body.contra;
    var nombre = req.body.nombre;
    var apellidos = req.body.apellidos;
    var mail = req.body.mail;

    pg.connect(process.env.DATABASE_URL, function(err, client, done) {
        client.query('SELECT * FROM test_table', function(err, result) {
         done();
         if (err)
            { console.error(err); response.send("Error " + err); }
         else
            { response.send(result.rows); }
        });
    });

});



app.get('/picasso', function (req, res) {
    var imagenes = {imgs: [
                        {url: 'PicassoGuernica.jpg'},
                        {url: 'Picasso_Drawing_by_pirouline.jpg'},
                        {url: 'PicassoGuernica.jpg'},
                        {url: 'Picasso_Drawing_by_pirouline.jpg'}
                        ]};
    res.render('hello', imagenes);//este iria al archivo hello.handlebars
});



var server = app.listen(process.env.PORT || 3000, function(){
    console.log('Listening in port %d', server.address().port);
});
