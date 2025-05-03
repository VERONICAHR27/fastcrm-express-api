import express from 'express';
import { createContact, getAllContacts, getContactById,deleteContact, updateContact } from '../controllers/contactController.js';


const router = express.Router();

router.get('/:id', getContactById);
router.get('/', getAllContacts);
router.post('/', createContact);
router.put('/:id', updateContact); // Ruta para editar un contacto
router.delete('/:id', deleteContact); // Ruta para eliminar un contacto por ID

export default router;