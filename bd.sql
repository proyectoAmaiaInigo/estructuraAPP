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
    idconcierto         integer PRIMARY KEY NOT NULL,
    fecha      varchar(40) NOT NULL,
    hora      varchar(45) NOT NULL,
    precio       varchar(45) NOT NULL,
    descripcion    varchar(200) NOT NULL,
    localizacion    varchar(100) NOT NULL
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