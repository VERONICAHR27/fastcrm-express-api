import express, { Router } from 'express';
import {
    getAllCompanies,
    updateCompany,
    deleteCompany,
    createCompany,
    getCompanyById
} from '../controllers/companyController.js';

const router = express.Router();

router.get('/', getAllCompanies); // Obtener todas las empresas
router.put('/:id', updateCompany); // Actualizar una empresa por ID
router.delete('/:id', deleteCompany); // Eliminar una empresa por ID
router.post('/', createCompany); // Ruta para agregar una nueva empresa
router.get('/:id', getCompanyById); // Obtener una empresa por ID
export default router;