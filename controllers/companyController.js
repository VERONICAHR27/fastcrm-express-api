import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validación con Zod
const companySchema = z.object({
    name: z.string().min(1, 'El nombre es obligatorio').max(255, 'El nombre es demasiado largo'),
    ruc: z.string().min(11, 'El RUC debe tener al menos 11 caracteres').max(11, 'El RUC no puede tener más de 11 caracteres'),
    contactId: z.string().nullable(), // Cambiar a String

});

export const createCompany = async (req, res) => {
    try {
        const validatedData = companySchema.parse(req.body);

        const { contactId, ...companyData } = validatedData;

        const newCompany = await prisma.company.create({
            data: {
                ...companyData,
                contacts: contactId
                    ? {
                          connect: { id: contactId }, // Conectar el contacto existente
                      }
                    : undefined,
            },
        });

        res.status(201).json(newCompany); // Respuesta exitosa con la empresa creada
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la empresa', details: error.message });
    }
};


export const getAllCompanies = async (req, res) => {
    try {
        const companies = await prisma.company.findMany({
            include: { contacts: true }, // Incluir los contactos relacionados
        });
        res.status(200).json(companies);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las empresas', details: error.message });
    }
};

export const getCompanyById = async (req, res) => {
    const { id } = req.params;

    try {
        console.log('ID recibido para buscar:', id); // Log para depuración

        const company = await prisma.company.findUnique({
            where: { id }, // Prisma espera que el ID sea un String
            include: { contacts: true }, // Incluir contactos relacionados si es necesario
        });

        if (!company) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }

        res.status(200).json(company);
    } catch (error) {
        console.error('Error al buscar la empresa:', error); // Log para depuración
        res.status(500).json({ error: 'Error al buscar la empresa', details: error.message });
    }
};

export const updateCompany = async (req, res) => {
    try {
        const { id } = req.params; // El ID ya es un String
        const validatedData = companySchema.parse(req.body);

        const { contactId, ...companyData } = validatedData;

        const updatedCompany = await prisma.company.update({
            where: { id }, // Pasar el ID directamente como String
            data: {
                ...companyData,
                contacts: contactId
                    ? {
                          connect: { id: contactId }, // Conectar el contacto existente
                      }
                    : undefined, // No modificar contactos si no se proporciona contactId
            },
        });

        res.status(200).json(updatedCompany);
    } catch (error) {
        console.error('Error al actualizar la empresa:', error); // Log para depuración
        res.status(400).json({ error: 'Error al actualizar la empresa', details: error.message });
    }
};

export const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ error: 'El ID de la compañía es requerido' });
        }

        console.log('ID recibido para eliminar:', id); // Log para depuración

        await prisma.company.delete({
            where: { id: id }, // Asegúrate de que el ID sea tratado como String
        });

        res.status(200).json({ message: 'Empresa eliminada correctamente' });
    } catch (error) {
        console.error('Error al eliminar la empresa:', error); // Log para depuración
        res.status(500).json({ error: 'Error al eliminar la empresa', details: error.message });
    }
};