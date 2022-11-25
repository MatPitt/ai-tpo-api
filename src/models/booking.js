import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
    userId: {
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
    interest: {
        type: String,
        required: true
    },
    status: {
        enum: ['ACEPTADA', 'CANCELADA', 'FINALIZADA', 'SOLICITADA'],
        required: false,
        default : 'SOLICITADA'
    },
    justification: {
        type: string,
        required: false
    },
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
