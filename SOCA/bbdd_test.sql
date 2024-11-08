-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.0.30 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para final
CREATE DATABASE IF NOT EXISTS `final` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `final`;

-- Volcando estructura para tabla final.alumno
CREATE TABLE IF NOT EXISTS `alumno` (
  `id_alumno` int NOT NULL AUTO_INCREMENT,
  `dni` int NOT NULL,
  `natalicio` date NOT NULL,
  PRIMARY KEY (`id_alumno`),
  KEY `dni` (`dni`),
  CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `persona` (`dni`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.alumno: ~0 rows (aproximadamente)
INSERT INTO `alumno` (`id_alumno`, `dni`, `natalicio`) VALUES
	(1, 35123456, '1999-03-12'),
	(2, 34876543, '1998-09-07'),
	(3, 40123789, '2000-11-25'),
	(4, 32456789, '1997-06-02'),
	(5, 36789123, '1999-01-18'),
	(6, 33567890, '1996-04-30'),
	(7, 35678901, '1997-12-05'),
	(8, 37890123, '1998-08-15'),
	(9, 38901234, '1999-03-10'),
	(10, 33345678, '1995-10-22'),
	(11, 32567890, '1996-12-08'),
	(12, 34890123, '1998-02-27'),
	(13, 36123456, '1999-07-17'),
	(14, 35234567, '1997-11-06'),
	(15, 32789012, '1996-05-19'),
	(16, 40456789, '2000-09-03'),
	(17, 31678123, '1995-01-24'),
	(18, 33234567, '1998-04-11'),
	(19, 33789456, '1996-10-09'),
	(20, 34567890, '1997-02-13'),
	(21, 36456789, '1999-08-20'),
	(22, 35345678, '1998-06-28');

-- Volcando estructura para tabla final.asistencia
CREATE TABLE IF NOT EXISTS `asistencia` (
  `id_asistencia` int NOT NULL AUTO_INCREMENT,
  `id_matricula` int DEFAULT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_asistencia`),
  KEY `id_matricula` (`id_matricula`),
  CONSTRAINT `asistencia_ibfk_1` FOREIGN KEY (`id_matricula`) REFERENCES `matricula` (`id_matricula`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.asistencia: ~0 rows (aproximadamente)

-- Volcando estructura para tabla final.calificacion
CREATE TABLE IF NOT EXISTS `calificacion` (
  `id_calificacion` int NOT NULL AUTO_INCREMENT,
  `id_matricula` int DEFAULT NULL,
  `tipo` enum('p1','p2','rp1','rp2','tf','tp1','tp2','tp3','tp4','tp5') DEFAULT NULL,
  `nota` decimal(3,1) NOT NULL,
  PRIMARY KEY (`id_calificacion`),
  KEY `id_matricula` (`id_matricula`),
  CONSTRAINT `calificacion_ibfk_1` FOREIGN KEY (`id_matricula`) REFERENCES `matricula` (`id_matricula`),
  CONSTRAINT `calificacion_chk_1` CHECK (((`nota` >= 1) and (`nota` <= 10)))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.calificacion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla final.carrera
CREATE TABLE IF NOT EXISTS `carrera` (
  `id_carrera` int NOT NULL AUTO_INCREMENT,
  `cue` int DEFAULT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_carrera`),
  KEY `cue` (`cue`),
  CONSTRAINT `carrera_ibfk_1` FOREIGN KEY (`cue`) REFERENCES `institucion` (`cue`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.carrera: ~3 rows (aproximadamente)
INSERT INTO `carrera` (`id_carrera`, `cue`, `nombre`) VALUES
	(1, 225689, 'Tec. Análisis de Sistemas'),
	(2, 225689, 'Profesorado de Inglés'),
	(3, 225478, 'Farmacia'),
	(4, 225478, 'Licenciatura en Bromatología'),
	(5, 995689, 'Lic. en Comercialización'),
	(6, 995689, 'Lic. en Comercio Internacional'),
	(7, 254689, 'Arquitectura y Urbanismo');

-- Volcando estructura para tabla final.curso
CREATE TABLE IF NOT EXISTS `curso` (
  `id_curso` int NOT NULL AUTO_INCREMENT,
  `legajo` int DEFAULT NULL,
  `id_materia` int DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `division` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_curso`),
  KEY `legajo` (`legajo`),
  KEY `id_materia` (`id_materia`),
  CONSTRAINT `curso_ibfk_1` FOREIGN KEY (`legajo`) REFERENCES `profesor` (`legajo`),
  CONSTRAINT `curso_ibfk_2` FOREIGN KEY (`id_materia`) REFERENCES `materia` (`id_materia`),
  CONSTRAINT `curso_chk_1` CHECK (regexp_like(`division`,_cp850'^[A-Z]$'))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.curso: ~3 rows (aproximadamente)
INSERT INTO `curso` (`id_curso`, `legajo`, `id_materia`, `fecha_inicio`, `fecha_fin`, `division`) VALUES
	(1, 101, 2, '2024-03-01', '2024-11-29', NULL),
	(2, 102, 1, '2024-03-01', '2024-11-29', NULL),
	(3, 102, 8, '2024-03-01', '2024-11-29', NULL);

-- Volcando estructura para tabla final.horario
CREATE TABLE IF NOT EXISTS `horario` (
  `id_horario` int NOT NULL AUTO_INCREMENT,
  `id_curso` int DEFAULT NULL,
  `dia_de_semana` tinyint unsigned NOT NULL,
  `hora_inicio` time NOT NULL,
  `hora_fin` time NOT NULL,
  `modulos` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id_horario`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  CONSTRAINT `horario_chk_1` CHECK ((`dia_de_semana` between 0 and 6)),
  CONSTRAINT `horario_chk_2` CHECK ((`modulos` between 1 and 9))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.horario: ~4 rows (aproximadamente)
INSERT INTO `horario` (`id_horario`, `id_curso`, `dia_de_semana`, `hora_inicio`, `hora_fin`, `modulos`) VALUES
	(1, 1, 4, '19:30:00', '21:35:00', 3),
	(2, 1, 5, '18:40:00', '20:50:00', 3),
	(3, 2, 4, '17:10:00', '19:20:00', 3),
	(4, 3, 2, '20:55:00', '22:15:00', 2);

-- Volcando estructura para tabla final.institucion
CREATE TABLE IF NOT EXISTS `institucion` (
  `cue` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(130) NOT NULL,
  `direccion` varchar(260) DEFAULT NULL,
  `id_localidad` int NOT NULL,
  PRIMARY KEY (`cue`),
  KEY `id_localidad` (`id_localidad`),
  CONSTRAINT `institucion_ibfk_1` FOREIGN KEY (`id_localidad`) REFERENCES `localidad` (`id_localidad`)
) ENGINE=InnoDB AUTO_INCREMENT=995690 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.institucion: ~4 rows (aproximadamente)
INSERT INTO `institucion` (`cue`, `nombre`, `direccion`, `id_localidad`) VALUES
	(225478, 'UNER', '25 de Mayo, 709', 801),
	(225689, 'Sedes Sapientiae', 'Santa Fe, 74', 801),
	(254689, 'Universidad de Mendoza', 'Boulogne Sur Mer 683', 1301),
	(995689, 'UCU', '25 de Mayo, 1312', 802);

-- Volcando estructura para tabla final.jurisdiccion
CREATE TABLE IF NOT EXISTS `jurisdiccion` (
  `id_jurisdiccion` int NOT NULL,
  `nombre` varchar(50) NOT NULL,
  PRIMARY KEY (`id_jurisdiccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.jurisdiccion: ~2 rows (aproximadamente)
INSERT INTO `jurisdiccion` (`id_jurisdiccion`, `nombre`) VALUES
	(8, 'Entre Ríos'),
	(13, 'Mendoza');

-- Volcando estructura para tabla final.justificacion
CREATE TABLE IF NOT EXISTS `justificacion` (
  `id_justificacion` int NOT NULL AUTO_INCREMENT,
  `id_asistencia` int DEFAULT NULL,
  PRIMARY KEY (`id_justificacion`),
  KEY `id_asistencia` (`id_asistencia`),
  CONSTRAINT `justificacion_ibfk_1` FOREIGN KEY (`id_asistencia`) REFERENCES `asistencia` (`id_asistencia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.justificacion: ~0 rows (aproximadamente)

-- Volcando estructura para tabla final.localidad
CREATE TABLE IF NOT EXISTS `localidad` (
  `id_localidad` int NOT NULL,
  `id_jurisdiccion` int DEFAULT NULL,
  `nombre` varchar(80) NOT NULL,
  PRIMARY KEY (`id_localidad`),
  KEY `id_jurisdiccion` (`id_jurisdiccion`),
  CONSTRAINT `localidad_ibfk_1` FOREIGN KEY (`id_jurisdiccion`) REFERENCES `jurisdiccion` (`id_jurisdiccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.localidad: ~3 rows (aproximadamente)
INSERT INTO `localidad` (`id_localidad`, `id_jurisdiccion`, `nombre`) VALUES
	(801, 8, 'Gualeguaychú'),
	(802, 8, 'Concepción del Uruguay'),
	(1301, 13, 'Mendoza');

-- Volcando estructura para tabla final.materia
CREATE TABLE IF NOT EXISTS `materia` (
  `id_materia` int NOT NULL AUTO_INCREMENT,
  `id_carrera` int DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `grado` int NOT NULL,
  PRIMARY KEY (`id_materia`),
  KEY `id_carrera` (`id_carrera`),
  CONSTRAINT `materia_ibfk_1` FOREIGN KEY (`id_carrera`) REFERENCES `carrera` (`id_carrera`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.materia: ~16 rows (aproximadamente)
INSERT INTO `materia` (`id_materia`, `id_carrera`, `nombre`, `grado`) VALUES
	(1, 1, 'Matemática II', 2),
	(2, 1, 'Programación II', 2),
	(3, 1, 'Programación III', 3),
	(4, 1, 'Inglés Técnico II', 2),
	(5, 2, 'Fonética I', 1),
	(6, 2, 'Pedagogía', 1),
	(7, 3, 'Química I', 1),
	(8, 3, 'Matemática I', 1),
	(9, 4, 'Matemática I', 1),
	(10, 4, 'Física', 1),
	(11, 5, 'Oratoria y Presentación', 1),
	(12, 5, 'Inglés I', 1),
	(13, 6, 'Matemática Empresarial', 1),
	(14, 6, 'Inglés I', 1),
	(15, 7, 'Construcciones I', 1),
	(16, 7, 'Dibujo y Expresión', 1);

-- Volcando estructura para tabla final.matricula
CREATE TABLE IF NOT EXISTS `matricula` (
  `id_matricula` int NOT NULL AUTO_INCREMENT,
  `id_alumno` int DEFAULT NULL,
  `id_curso` int DEFAULT NULL,
  PRIMARY KEY (`id_matricula`),
  KEY `id_alumno` (`id_alumno`),
  KEY `id_curso` (`id_curso`),
  CONSTRAINT `matricula_ibfk_1` FOREIGN KEY (`id_alumno`) REFERENCES `alumno` (`id_alumno`),
  CONSTRAINT `matricula_ibfk_2` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.matricula: ~44 rows (aproximadamente)
INSERT INTO `matricula` (`id_matricula`, `id_alumno`, `id_curso`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 3, 1),
	(4, 4, 1),
	(5, 5, 1),
	(6, 6, 1),
	(7, 7, 1),
	(8, 8, 1),
	(9, 9, 1),
	(10, 10, 1),
	(11, 11, 1),
	(12, 12, 1),
	(13, 13, 1),
	(14, 14, 1),
	(15, 15, 1),
	(16, 16, 1),
	(17, 17, 1),
	(18, 18, 1),
	(19, 19, 1),
	(20, 20, 1),
	(21, 21, 1),
	(22, 22, 1),
	(23, 1, 2),
	(24, 2, 2),
	(25, 3, 2),
	(26, 4, 2),
	(27, 5, 2),
	(28, 6, 2),
	(29, 7, 2),
	(30, 8, 2),
	(31, 9, 2),
	(32, 10, 2),
	(33, 11, 2),
	(34, 12, 2),
	(35, 13, 2),
	(36, 14, 2),
	(37, 15, 2),
	(38, 16, 2),
	(39, 17, 2),
	(40, 18, 2),
	(41, 19, 2),
	(42, 20, 2),
	(43, 21, 2),
	(44, 22, 2);

-- Volcando estructura para tabla final.persona
CREATE TABLE IF NOT EXISTS `persona` (
  `dni` int NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.persona: ~24 rows (aproximadamente)
INSERT INTO `persona` (`dni`, `nombre`, `apellido`, `email`) VALUES
	(31678123, 'Elisa', 'Ronconi', 'elisa.ronconi@email.com'),
	(32456789, 'Luca', 'Giordano', 'luca.giordano@email.com'),
	(32567890, 'Lucila', 'Mercado Ruiz', 'lucila.mercado@email.com'),
	(32789012, 'Ignacio', 'Piter', 'ignacio.piter@email.com'),
	(33234567, 'Exequiel', 'Sanchez', 'exequiel.sanchez@email.com'),
	(33345678, 'Giuliana', 'Mercado Aviles', 'giuliana.mercado@email.com'),
	(33567890, 'Agustin', 'Gomez', 'agustin.gomez@email.com'),
	(33789456, 'Melina', 'Schimpf Baldo', 'melina.schimpf@email.com'),
	(34567890, 'Diego', 'Segovia', 'diego.segovia@email.com'),
	(34876543, 'Lucas', 'Cedres', 'lucas.cedres@email.com'),
	(34890123, 'Angel', 'Murillo', 'angel.murillo@email.com'),
	(35123456, 'Valentino', 'Andrade', 'valentino.andrade@email.com'),
	(35234567, 'Fausto', 'Parada', 'fausto.parada@email.com'),
	(35345678, 'Yamil', 'Villa', 'yamil.villa@email.com'),
	(35678901, 'Brian', 'Gonzalez', 'brian.gonzalez@email.com'),
	(36123456, 'Juan', 'Nissero', 'juan.nissero@email.com'),
	(36456789, 'Camila', 'Sittner', 'camila.sittner@email.com'),
	(36789123, 'Bruno', 'Godoy', 'bruno.godoy@email.com'),
	(37890123, 'Federico', 'Guigou Scottini', 'federico.guigou@email.com'),
	(38901234, 'Luna', 'Marrano', 'luna.marrano@email.com'),
	(40123789, 'Facundo', 'Figun', 'facundo.figun@email.com'),
	(40456789, 'Tomas', 'Planchon', 'tomas.planchon@email.com'),
	(44555001, 'Javier', 'Parra', 'jparra@profesor.com'),
	(55666002, 'Ana', 'Gómez', 'agomez@profesor.com');

-- Volcando estructura para tabla final.profesor
CREATE TABLE IF NOT EXISTS `profesor` (
  `legajo` int NOT NULL,
  `dni` int NOT NULL,
  `password` varchar(100) NOT NULL,
  PRIMARY KEY (`legajo`),
  KEY `dni` (`dni`),
  CONSTRAINT `profesor_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `persona` (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Volcando datos para la tabla final.profesor: ~2 rows (aproximadamente)
INSERT INTO `profesor` (`legajo`, `dni`, `password`) VALUES
	(101, 44555001, '1234'),
	(102, 55666002, '1234');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
