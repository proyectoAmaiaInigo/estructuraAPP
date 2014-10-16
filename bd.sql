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

