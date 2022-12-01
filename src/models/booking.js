import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    professorId: {
        type: String,
        required: true,
    },
    studentName: {
        type: String,
        required: true,
    },
    courseId: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true
    },
    availability:{
        type: String,
        required: true
    }, 
    interestMessage: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['ACEPTADA', 'CANCELADA', 'FINALIZADA', 'SOLICITADA'],
        default : 'SOLICITADA'
    }
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
