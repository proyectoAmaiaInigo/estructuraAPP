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


// **********************************************

// app.get('/', function (req, res) {
// });

app.post('/login',function (req, res) {
    console.log(req.body.username);
    console.log(req.body.password);

    

    res.send("ok");
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
