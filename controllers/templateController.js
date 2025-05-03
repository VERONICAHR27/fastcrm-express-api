import Template from '../models/template.js';

export const getAllTemplates = async (req, res) => {
    try {
        const { q, type } = req.query;
        const validTypes = ['Welcome', 'Follow-up', 'Farewell'];
        if (type && !validTypes.includes(type)) {
            return res.status(400).json({ message: `El tipo '${type}' no es válido. Tipos permitidos: ${validTypes.join(', ')}` });
        }

        const filter = {
            ...(q ? { content: { $regex: q, $options: 'i' } } : {}),
            ...(type ? { type } : {})
        };

        const actualtemplates = await Template.find(filter);
        res.status(200).json(actualtemplates);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getTemplateById = async (req, res) => {
    const { id } = req.params;

    try {
        const template = await Template.findById(id);

        if (!template) {
            return res.status(404).json({ message: 'Plantilla no encontrada' });
        }

        res.status(200).json(template);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar la plantilla', error });
    }
};

export const createTemplate = async (req, res) => {
    try {
        const newTemplate = new Template(req.body);
        const savedTemplate = await newTemplate.save();
        res.status(201).json(savedTemplate);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la plantilla', error });
    }
};

export const updateTemplate = async (req, res) => {
    try {
        const updatedTemplate = await Template.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTemplate);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la plantilla', error });
    }
};

export const deleteTemplate = async (req, res) => {
    try {
        await Template.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Plantilla eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la plantilla', error });
    }
};