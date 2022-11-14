import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
    studentProfileId: {
        type: String,
        required: false,
    },
    education_type: {
        type: String,
        required: false,
        enum: ['PRIMARIA', 'SECUNDARIA', 'TERCIARIA', 'UNIVERSITARIA'],
    },
    is_finished: {
        type: Boolean,
        required: true,
        default: false,
    },
});

const Education = mongoose.model('User', EducationSchema);

export default Education;
