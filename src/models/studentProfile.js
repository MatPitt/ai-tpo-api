import mongoose from 'mongoose';

var StudentProfileSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    birthdate : {
        type: Date,
        required: true
    },
    bookedCourses : {
        type: [String],
        required: true,
        default:[]
    },
    studies : {
        type: [String],
        required: true,
        default:[]
    },
})

const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

export default StudentProfile;