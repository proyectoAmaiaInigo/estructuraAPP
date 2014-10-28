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

var Sequelize = require('sequelize');
// var db = new sqlze('databasename', 'username', 'password',{
var db = null;

if (process.env.DATABASE_URL) {
    // the application is executed on Heroku ... use the postgres database 
    console.log(process.env.DATABASE_URL);
    db = new Sequelize(process.env.DATABASE_URL);
  } else {
    // the application is executed on the local machine ... use mysql
    // var db = new sqlze('databasename', 'username', 'password',{
    db = new Sequelize('concerts', 'root', 'root',{
        dialect: 'mysql',
        port: 3306
    });
  }

db
    .authenticate()
    .complete(function(err){
        if(!!err) {
            console.log('Unable to connect to database: ', err);
        } else {
            console.log('Connection OK!');
        }
    });
//

app.get('/', function (req, res) {
    //index
    res.render('index');
 });

app.post('/login',function (req, res) {

    var id = req.body.usuario;
    var contra = req.body.password;

    db.query('SELECT * FROM usuario WHERE email ='+"'"+id+"'").success(function(usuario){

        console.log(usuario);
    
        if (usuario.length==0) {
            res.send("usuario erroneo");
        } else {
            var contraBD = (usuario[0].contrasena);
            console.log(usuario[0].contrasena);
            console.log(contra);
            if(contraBD.localeCompare(contra)==0){
                res.send("usuario y contraseña ok");
            }else{
                res.send("usuario ok y contraseña ko");
            }
        }
    });
});
app.post('/registro', function (req, res) {
    
    var id = req.body.usuarioform;
    var contra = req.body.contra;
    console.log("dentro");

    var sql = 'INSERT INTO usuario VALUES (\''+id+'\', \''+contra+'\');';

    console.log(sql);

    db
    .query(sql, null, {raw:true})

    .success(function(rows){
        // no errors
        // console.log({"msg":"insert OK", "sql":sql});
        // res.json({"msg":"insert OK", "sql":sql});delimiter $$
        res.render('index');
        // res.json(JSON.stringify(rows));
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
