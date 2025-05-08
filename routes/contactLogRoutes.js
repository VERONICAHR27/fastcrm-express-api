import express from 'express';
import { sendTemplateToContact, getContactLogs, createContactLog } from '../controllers/contactLogController.js';

const router = express.Router();

// Ruta para enviar una plantilla a un contacto
router.post('/send-template', sendTemplateToContact);

// Ruta para obtener todos los logs de contacto
router.get('/', getContactLogs);

// Ruta para crear un log de contacto manualmente (opcional)
router.post('/', createContactLog);

export default router;