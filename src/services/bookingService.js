import dbService from './dbService.js';
import Booking from '../models/booking.js';
// TODO: import user model
// TODO: Write query

export default {
    async getAllBookings() {
        return await dbService.find(Booking, {});
    },
    async getBookingById(id) {
        return await dbService.findById(Booking, id);
    },
    async createBooking(booking) { //no se puede usar class como nombre de un parametro
        //Creating a new Mongoose Object by using the new keyword
        var newBooking = new Booking({
            userId: booking.userId,
            courseId: booking.courseId,
            contactNumber: booking.contactNumber,
            contactEmail: booking.contactEmail,
            availability: booking.availability,
            interestMessage: booking.interestMessage,
            status: booking.status,
        })

        try {
            // Saving the created class
            var savedBooking = await newBooking.save()
            return savedBooking;
        } catch (e) {
            console.log(e);
            throw Error('Error while creating new class...')
        }
    },
    async deleteBookingById(id) {
        return await dbService.deleteById(Booking, id);
    }
};
