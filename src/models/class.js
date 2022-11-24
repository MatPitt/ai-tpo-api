import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    frequency: {
        type: String,
        required: TRUE,
        enum: ['UNICA', 'MENSUAL','SEMANAL'],
    },
    duration: {
        type: String,
        required: true
    },
    cost: {
        type: Float,
        required: true
    },
    published: {
        type: Boolean,
        required: false
    },
    description: {
        type: String,
        required: true
    },
    enrolledStudents: {
        type: [],
        required: false
    },
    comments: {
        type: [],
        required: false
    },
    score: {
        type: [],
        required: false
    },
    classType: {
        type: String,
        required: TRUE,
        enum: ['INDIVIDUAL', 'GRUPAL'],
    },
    bookedClasses: {
        type: [],
        required: TRUE,
        default: []
    }
});

const Class = mongoose.model('Comment', ClassSchema);

export default Class;