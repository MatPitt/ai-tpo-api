import mongoose from 'mongoose';
import {Object} from "mongoose/lib/schema/index.js";

const CourseSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    professorName: {
        type: String,
        required: true,
        default:''
    },
    professorLastname: {
        type: String,
        required: true,
        default:''
    },
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
        required: true,
        default: true
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
        type: [String],
        required: false
    },
    score: {
        type: Object,
        required: true,
        default:{scoreSum:0, scoresCounts:0, scoreValue:0}
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
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false
    },
});

const Course = mongoose.model('Course', CourseSchema);

export default Course;