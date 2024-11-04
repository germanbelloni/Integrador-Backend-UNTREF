require("dotenv").config();
const express = require("express");
const app = express();
const contenidoRoutes = require("./routes/contenidoRoutes");
const bd = require("./conexion/database");
const { swaggerDocs, swaggerUi } = require("./config/swagger");

// Middlewares
app.use(express.json());

// Rutas
app.use("/contenido", contenidoRoutes);

// Documentar la ruta de Swagger
app.use("/apidocs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port https://localhost:${PORT}`);
  console.log(`Documentation: https://localhost:${PORT}/apidocs`);
});

bd.sync()
  .then(() => {
    console.log("Base de datos sincronizada");
  })
  .catch(() => {
    console.log("Error sincronizando base de datos");
  });
