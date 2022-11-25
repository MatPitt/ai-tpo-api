import mongoose from 'mongoose';

const CourseSchema = new mongoose.Schema({
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
        required: true,
        enum: ['UNICA', 'MENSUAL','SEMANAL'],
    },
    duration: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
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
        type: String,
        required: false
    },
    score: {
        type: [],
        required: false
    },
    classType: {
        type: String,
        required: true,
        enum: ['INDIVIDUAL', 'GRUPAL'],
    },
    bookedClasses: {
        type: [],
        required: true,
        default: []
    }
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;