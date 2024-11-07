# Proyecto Integrador: CRUD con Node.js y MySQL

## Pasos para usar la API

Descargar desde la carpeta **`/sql`** el archivo Trailerflix.sql del repositorio

Clonar el repositorio en tu computadora local usando el comando:

```
https://github.com/germanbelloni/Trabajo-Integrador-Relacional-Backend-Diplomatura-UNTREF.git
```

Abrir el proyecto en tu IDE de VS Code

Instalar las dependencias necesarias ejecutando el siguiente comando en la terminal:

npm install

Ejecutar el servidor con el comando: npm start

Abrir MySQL Workbench y copiar de la carpeta `/sql` del repositorio los archivos que contienen los inserts, uno a uno para poblar la base de datos.

## Tecnologias utilizadas

**Framework:** Express
**ORM:** Sequelize
**Server:** MySQL
**Entorno:** Node js

## Variables de entorno

Para ejecutar este proyecto, se deberá agregar las siguientes variables de entorno a su archivo .env

`DB_USER:` Especifica el usuario de la base de datos

`DB_PASSWORD:` La contraseña del usuario de la base de datos

`DB_NAME:` El nombre de la base de datos que estás usando

`DB_HOST:` La dirección del servidor de la base de datos

`DB_DIALECT:` Especifica el tipo de base de datos que estás usando con Sequelize

## Notas adicionales:

- Asegúrate de tener la base de datos en funcionamiento antes de iniciar el servidor.
- Verifica las configuraciones de conexión en ./conexion/database.js y cambia el nombre de .env copy a .env junto a las configuraciones de tu dispositivo para que coincidan con tu entorno local.

## Estructura del Repositorio

```plaintext
/conexion
  - database.js
/config
  - swagger.js
/controllers
  - contenidoController.js
/json
  - trailerflix.json
/sql
  -insert_actors.sql
  -insert_categories.sql
  -insert_contenido.sql
  -insert_genres.sql
  -insert_contenido_actores.sql
  -trailerflix.sql
  -entidad-relacion.png
/README.md
/app.js
/conexion/
  - database.js
/models/
  - contenido.js
  - categoria.js
  - genero.js
  - actor.js
  - contenido_actores.js
/routes/
  - contenidoRoutes.js
```

### Descripción de Archivos

- **/json**: Contiene el archivo trailerflix.json con los datos de películas y series.
- /**sql:** Contiene los inserts correspondientes y la creacion de las tablas en formato .sql
- **/README.md**: Este archivo, con la descripción del proyecto.
- **/app.js**: Archivo principal de la aplicación Node.js.
- **/conexion/database.js**: Configuración de la conexión a MySQL.
- **/models/**: Modelos de datos para las tablas en MySQL.
- **/routes/**: Definición de las rutas y endpoints del CRUD.
