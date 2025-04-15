const mongoose = require('mongoose');

// Definir el esquema de la plantilla
const templateSchema = new mongoose.Schema({
    type: { type: String, required: true,
        enum: ['Welcome', 'Follow-up', 'Farewell'], // Tipos de plantilla permitidos
     }, // Tipo de plantilla
    content: { type: String, required: true }, // Contenido de la plantilla
    labels: { type: [String], default: [] }, // Etiquetas asociadas
    author: { type: String, required: true }, // Autor de la plantilla
    createdAt: { type: Date, default: Date.now } // Fecha de creación
});



// Crear el modelo
const Template = mongoose.model('Template', templateSchema);

module.exports = Template;