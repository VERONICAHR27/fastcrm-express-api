import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

// Validación con Zod
const contactSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio').max(255, 'El nombre es demasiado largo'),
  whatsapp: z.string().min(9, 'El whatsapp es obligatorio').max(9, 'El whatsapp es demasiado largo'),
  companyId: z.string().optional(), // Cambiar a String
});

export const createContact = async (req, res) => {
  try {
    const { name, whatsapp, companyId } = req.body;

    if (!name || !whatsapp) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const contact = await prisma.contact.create({
      data: {
        name,
        whatsapp,
        companyId: companyId || null, // Opcional
      },
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating contact' });
  }
};

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await prisma.contact.findMany({
      include: { company: true },
    });
    res.status(200).json(contacts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
};

export const getContactById = async (req, res) => {
  const { id } = req.params;

  console.log('ID recibido para buscar:', id); // Log para depuración

  try {
    const contact = await prisma.contact.findUnique({
      where: { id }, // Usar el ID directamente si es una cadena
      include: { company: true }, // Incluir datos relacionados si es necesario
    });

    if (!contact) {
      return res.status(404).json({ error: 'Contacto no encontrado' });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error('Error al buscar el contacto:', error); // Log para depuración
    res.status(500).json({ error: 'Error fetching contact', details: error.message });
  }
};

export const updateContact = async (req, res) => {
  const { id } = req.params;

  console.log('Cuerpo de la solicitud recibido:', req.body); // Log para depuración

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío o no es válido' });
  }

  const { name, whatsapp, companyId } = req.body;

  if (!name || !whatsapp) {
    return res.status(400).json({ error: 'Name and whatsapp are required' });
  }

  try {
    const updatedContact = await prisma.contact.update({
      where: { id }, // Usar el ID directamente como cadena
      data: {
        name,
        whatsapp,
        companyId: companyId || null,
      },
    });

    res.status(200).json(updatedContact);
  } catch (error) {
    console.error('Error al actualizar el contacto:', error);
    res.status(500).json({ error: 'Error updating contact', details: error.message });
  }
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;

  console.log('ID recibido para eliminar:', id); // Log para depuración

  try {
    const deletedContact = await prisma.contact.delete({
      where: { id: id }, // Asegurarse de que el ID sea tratado como string
    });
    res.status(200).json({ message: 'Contacto eliminado correctamente', deletedContact });
  } catch (error) {
    console.error('Error al eliminar el contacto:', error); // Log para depuración
    res.status(500).json({ error: 'Error deleting contact' });
  }
};

