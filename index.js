import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import templateRoutes from './routes/templateRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import contactLogRoutes from './routes/contactLogRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware para procesar JSON
app.use(cors());

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conexión exitosa a MongoDB Atlas'))
    .catch((err) => console.error('Error al conectar a MongoDB:', err));

app.use('/api/templates', templateRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/contact-logs', contactLogRoutes);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});