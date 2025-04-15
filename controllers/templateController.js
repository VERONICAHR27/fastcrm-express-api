const Template = require('../models/template.js');

// Obtener todas las plantillas
const getAllTemplates = async (req, res) => {
    try {
        const { q, type } = req.query; // Obtener los parámetros de búsqueda desde la query string

        // Validar que el tipo esté dentro del enum
        const validTypes = ['Welcome', 'Follow-up', 'Farewell'];
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({ message: `El tipo '${type}' no es válido. Tipos permitidos: ${validTypes.join(', ')}` });
        }

        // Construir el filtro dinámico
        const filter = {
            ...(q ? { content: { $regex: q, $options: 'i' } } : {}), // Filtrar por contenido si se proporciona "q"
            ...(type ? { type } : {}) // Filtrar por tipo si se proporciona "type"
        };
        
        

        
        // Retornar los resultados reales (sin explain) al cliente
        const actualtemplates = await Template.find(filter);
        res.status(200).json(actualtemplates);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
};

// Crear una nueva plantilla
const createTemplate = async (req, res) => {
    try {
        const newTemplate = new Template(req.body);
        const savedTemplate = await newTemplate.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la plantilla', error });
    }
};

// Actualizar una plantilla por ID
const updateTemplate = async (req, res) => {
    try {
        const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTemplate);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la plantilla', error });
    }
};

// Eliminar una plantilla por ID
const deleteTemplate = async (req, res) => {
    try {
        await Template.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Plantilla eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la plantilla', error });
    }
};

module.exports = {
    getAllTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate
};