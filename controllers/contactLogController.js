import { PrismaClient } from '@prisma/client';
import Template from '../models/template.js'; // Importar el modelo de plantilla de Mongoose

const prisma = new PrismaClient();

// Función para enviar una plantilla a un contacto y registrar el envío
export const sendTemplateToContact = async (req, res) => {
  try {
    const { contactId, templateId } = req.body;

    console.log('Datos recibidos en el backend:', { contactId, templateId });

    if (!contactId || !templateId) {
      return res.status(400).json({ error: 'El contactId y el templateId son obligatorios.' });
    }

    // Buscar el contacto en PostgreSQL usando Prisma
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });

    console.log('Contacto encontrado:', contact);

    if (!contact) {
      return res.status(404).json({ error: 'El contacto no existe.' });
    }

    // Buscar la plantilla en MongoDB usando Mongoose
    const template = await Template.findById(templateId);

    console.log('Plantilla encontrada:', template);

    if (!template) {
      return res.status(404).json({ error: 'La plantilla no existe.' });
    }

    // Personalizar el contenido de la plantilla
    const personalizedContent = template.content.replace('{name}', contact.name);

    console.log('Contenido personalizado:', personalizedContent);

    // Registrar el envío en ContactLog usando Prisma
    const contactLog = await prisma.contactLog.create({
      data: {
        contactId,
        templateId: template._id.toString(),
        template: personalizedContent, // Guardar el contenido personalizado
      },
    });

    console.log('Registro de contacto creado:', contactLog);

    // Generar el mensaje para WhatsApp
    const whatsappMessage = personalizedContent;
    console.log(`Enviando mensaje a ${contact.whatsapp}: ${whatsappMessage}`);

    res.status(200).json({
      message: 'Mensaje enviado correctamente.',
      contactLog,
      whatsappMessage
    });
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor.', details: error.message });
  }
};

// Función para obtener todos los logs de contacto
export const getContactLogs = async (req, res) => {
  try {
    const logs = await prisma.contactLog.findMany({
      include: { contact: true }, // Incluir los datos del contacto
      orderBy: { createdAt: 'desc' }, // Ordenar por fecha descendente
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error('Error al obtener los registros de contacto:', error);
    res.status(500).json({ error: 'Error al obtener los registros de contacto', details: error.message });
  }
};

// Función para crear un log de contacto manualmente (opcional)
export const createContactLog = async (req, res) => {
  try {
    const { contactId, templateId } = req.body;

    if (!contactId || !templateId) {
      return res.status(400).json({ error: 'ContactId y templateId son requeridos' });
    }

    // Buscar la plantilla en MongoDB
    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ error: 'La plantilla no existe' });
    }

    // Buscar el contacto en PostgreSQL
    const contact = await prisma.contact.findUnique({
      where: { id: contactId },
    });
    if (!contact) {
      return res.status(404).json({ error: 'El contacto no existe' });
    }

    // Crear el registro de contacto
    const contactLog = await prisma.contactLog.create({
      data: {
        contactId,
        templateId: template._id.toString(),
        template: template.content, // Guardar el contenido original
      },
      include: { contact: true }, // Incluir los datos del contacto en la respuesta
    });

    res.status(201).json(contactLog);
  } catch (error) {
    console.error('Error al crear el registro de contacto:', error);
    res.status(500).json({ error: 'Error al crear el registro de contacto', details: error.message });
  }
};