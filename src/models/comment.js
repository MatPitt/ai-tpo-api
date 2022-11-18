import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    commentId: {
        type: String,
        required: true,
    },
    studentAuthor: {
        type: String,
        required: true,
    },
    class: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Education;
