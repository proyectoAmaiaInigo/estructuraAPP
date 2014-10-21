delimiter $$

CREATE TABLE `usuario` (
  `idusuario` varchar(15) NOT NULL,
  `contrasena` varchar(200) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `mail` varchar(45) NOT NULL,
  `localidades` varchar(45) DEFAULT NULL,
  `grupos` varchar(45) DEFAULT NULL,
  `foto_perfil` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1$$

CREATE TABLE usuario (
    email      		 varchar(5) CONSTRAINT firstkey PRIMARY KEY NOT NULL,
    contrasena      varchar(40) NOT NULL,
    localidades      varchar(45) NULL,
    grupos			 varchar(45) NULL,
    foto_perfil		 varchar(45) NULL
);

INSERT INTO usuario VALUES
    ('amaia', 'amaia', '', '', '');
    