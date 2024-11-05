-- CREATE DATABASE IF NOT EXISTS trailerflix;
-- USE trailerflix;
CREATE TABLE IF NOT EXISTS `categorias` (
    `id_categoria` int AUTO_INCREMENT NOT NULL UNIQUE,
    `nombre_categoria` varchar(50) NOT NULL,
    PRIMARY KEY (`id_categoria`)
);
CREATE TABLE IF NOT EXISTS `contenido` (
    `id` int AUTO_INCREMENT NOT NULL UNIQUE,
    `poster` varchar(255) NOT NULL,
    `titulo` varchar(255) NOT NULL,
    `resumen` text NOT NULL,
    `temporadas` int NOT NULL,
    `duracion` varchar(50) NOT NULL,
    `trailer` varchar(255) NOT NULL,
    `reparto` text NOT NULL,
    `categorias` int NOT NULL,
    `generos` int NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `generos` (
    `id_genero` int AUTO_INCREMENT NOT NULL UNIQUE,
    `nombre_genero` varchar(50) NOT NULL,
    PRIMARY KEY (`id_genero`)
);

CREATE TABLE IF NOT EXISTS `actores` (
    `id_actor` int AUTO_INCREMENT NOT NULL UNIQUE,
    `nombre_actor` varchar(255) NOT NULL,
    PRIMARY KEY (`id_actor`)
);

CREATE TABLE IF NOT EXISTS `contenido_actores` (
    `id_contenido` int NOT NULL,
    `id_actor` int NOT NULL,
    PRIMARY KEY (`id_contenido`, `id_actor`), -- Definición de clave primaria
    CONSTRAINT `contenido_actores_fk0` FOREIGN KEY (`id_contenido`) REFERENCES `contenido` (`id`),
    CONSTRAINT `contenido_actores_fk1` FOREIGN KEY (`id_actor`) REFERENCES `actores` (`id_actor`) 
);

CREATE TABLE IF NOT EXISTS `contenido_genero` (
    `id_contenido` int NOT NULL,
    `id_genero` int NOT NULL,
    PRIMARY KEY (`id_contenido`, `id_genero`), -- Definición de clave primaria
    CONSTRAINT `contenido_genero_fk0` FOREIGN KEY (`id_contenido`) REFERENCES `contenido` (`id`),
    CONSTRAINT `contenido_genero_fk1` FOREIGN KEY (`id_genero`) REFERENCES `generos` (`id_genero`) 
);
