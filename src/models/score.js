import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    studentAuthor: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

const Score = mongoose.model('Score', ScoreSchema);

export default Score;