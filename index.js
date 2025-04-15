const express = require('express');
const mongoose = require('mongoose');
const templateRoutes = require('./routes/templateRoutes');
const cors = require('cors'); // Importar cors para habilitar CORS
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;


// Permitir solicitudes desde cualquier origen
app.use(cors());


// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

// Middleware
app.use(express.json());

// Rutas
app.use('/api/templates', templateRoutes);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});