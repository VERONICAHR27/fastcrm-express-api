import express from 'express';
import {
    getAllTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById
} from '../controllers/templateController.js';

const router = express.Router();

router.get('/', getAllTemplates);
router.get('/:id', getTemplateById);
router.post('/', createTemplate);
router.put('/:id', updateTemplate);
router.delete('/:id', deleteTemplate);

export default router;