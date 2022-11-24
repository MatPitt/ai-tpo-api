import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    profilePictureReference: {
        type: String,
        required: false,
    },
    studentProfileId: {
        type: String,
        required: false,
    },
    professorProfileId: {
        type: String,
        required: false,
    },
    is_deleted: {
        type: Boolean,
        required: true,
        default: false,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

const User = mongoose.model('User', UserSchema);

export default User;