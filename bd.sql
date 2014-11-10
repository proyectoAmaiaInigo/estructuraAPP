CREATE TABLE usuario (
    email      		 varchar(45) PRIMARY KEY NOT NULL,
    contrasena      varchar(40) NOT NULL,
    localidades      varchar(45) NULL,
    grupos			 varchar(45) NULL,
    foto_perfil		 varchar(45) NULL
);

INSERT INTO usuario VALUES
    ('amaia', 'amaia', '', '', '');

CREATE TABLE conciertos (
    idconcierto         serial PRIMARY KEY NOT NULL ,
    fecha      varchar(40) NOT NULL,
    hora      varchar(45) NOT NULL,
    precio       varchar(45) NOT NULL,
    descripcion    varchar(200) NOT NULL,
    localizacion    varchar(100) NOT NULL
);

CREATE TABLE noticias (
    idnoticia         integer PRIMARY KEY NOT NULL,
    titulo      varchar(300) NOT NULL,
    subtitulo      varchar(500) NOT NULL,
    contenido       varchar(2000) NOT NULL,
    fecha    varchar(200) NOT NULL
);

    CREATE TABLE grupo (
    idgrupo          integer PRIMARY KEY NOT NULL,
    nombre      varchar(100) NOT NULL,
    estilo      varchar(45) NULL,
    descripcion       varchar(200) NULL
);
    CREATE TABLE usuario_grupo (
    idgrupo          integer references grupo(idgrupo),
    email        varchar(45) references usuario(email)
);

    CREATE TABLE grupo_concierto (
    idgrupo          integer references grupo(idgrupo),
    idconcierto        integer references conciertos(idconcierto)
);

    CREATE TABLE usuario_concierto (
    email        varchar(45) references usuario(email),
    idconcierto        integer references conciertos(idconcierto)
);

    var pg = require('pg'); 
//or native libpq bindings
//var pg = require('pg').native

var conString = "postgres://username:password@localhost/database";

var client = new pg.Client(conString);
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT NOW() AS "theTime"', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    console.log(result.rows[0].theTime);
    //output: Tue Jan 15 2013 19:12:47 GMT-600 (CST)
    client.end();
  });
});

var client = new pg.Client({
    user: "giudgubrrycvwo",
    password: "nLyDs54DsiPVzvWUO5qykvn6H1",
    database: "d384d5q0rueh4o",
    port: 5432,
    host: "ec2-54-83-199-115.compute-1.amazonaws.com",
    ssl: true
}); 
client.connect();

function isEmptyJSON(obj) {
  for(var i in obj) { return false; }
  return true;
}