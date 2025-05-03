import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['Welcome', 'Follow-up', 'Farewell'],
    },
    content: { type: String, required: true },
    labels: { type: [String], default: [] },
    author: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Template = mongoose.model('Template', templateSchema);

export default Template;