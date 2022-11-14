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
})

const StudentProfile = mongoose.model('StudentProfile', StudentProfileSchema);

export default StudentProfile;