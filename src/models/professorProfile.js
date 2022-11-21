import mongoose from 'mongoose';

var ProfessorProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    courses : {
        type: [String],
        required: true,
        default: []
    },
    titles : {
        type: [String],
        required: true,
        default: []
    },
    workExperience : {
        type: [String],
        required: true,
        default: []
    },
})

const ProfessorProfile = mongoose.model('ProfessorProfile', ProfessorProfileSchema);

export default ProfessorProfile;