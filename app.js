const express = require('express');
const app = express();
const contenidoRoutes = require('./routes/contenidoRoutes');
const bd = require('./conexion/database')

// Middlewares
app.use(express.json());

// Rutas
app.use('/contenido', contenidoRoutes);

// Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  
bd.sync()
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(() => {
    console.log('Error sincronizando base de datos');
  })