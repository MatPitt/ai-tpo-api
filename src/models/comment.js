import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    studentAuthor: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true
    },
    commentText: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: false,
        enum: ['PENDIENTE','ACTIVO', 'BLOQUEADO'],
        default: "PENDIENTE"
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
