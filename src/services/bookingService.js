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
    async getBookingsByProfessorId(professorId) {
        return await Booking.find({professorId: professorId});
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
            professorId: booking.professorId,
            studentName: booking.studentName,
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
    },
    async updateBooking(booking) {

        try {
            var oldBooking = await Booking.findById(booking.bookingId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class booking...')
        }

        if(!oldBooking){
            return false;
        }
        console.log('course booking',oldBooking)
        //Edit the User Object
        oldBooking.status = booking.status ? booking.status : oldBooking.status;
        console.log('oldBooking new',oldBooking)
        try {
            var savedBooking = await oldBooking.save()
            console.log('savedClass',savedBooking)
            return savedBooking;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Class Booking");
        }
    }
};
