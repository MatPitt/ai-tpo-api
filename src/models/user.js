import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
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
    studentProfileId: {
        type: String,
        required: false,
    },
    profesorProfileId: {
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
