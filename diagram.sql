-- Crear tabla 'categorias'
CREATE TABLE IF NOT EXISTS categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50) NOT NULL
);

-- Crear tabla 'generos'
CREATE TABLE IF NOT EXISTS generos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL
);

-- Crear tabla 'actores'
CREATE TABLE IF NOT EXISTS actores (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL
);

-- Crear tabla 'contenido'
CREATE TABLE IF NOT EXISTS contenido (
    id INT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    categoria_id INT,
    resumen TEXT,
    temporadas VARCHAR(10),
    duracion VARCHAR(50),
    trailer VARCHAR(255),
    FOREIGN KEY (categoria_id) REFERENCES categorias(id)
);

-- Crear tabla intermedia 'contenido_generos' para la relación muchos a muchos entre contenido y generos
CREATE TABLE IF NOT EXISTS contenido_generos (
    contenido_id INT,
    genero_id INT,
    PRIMARY KEY (contenido_id, genero_id),
    FOREIGN KEY (contenido_id) REFERENCES contenido(id),
    FOREIGN KEY (genero_id) REFERENCES generos(id)
);

-- Crear tabla intermedia 'contenido_actores' para la relación muchos a muchos entre contenido y actores
CREATE TABLE IF NOT EXISTS contenido_actores (
    contenido_id INT,
    actor_id INT,
    PRIMARY KEY (contenido_id, actor_id),
    FOREIGN KEY (contenido_id) REFERENCES contenido(id),
    FOREIGN KEY (actor_id) REFERENCES actores(id)
);
