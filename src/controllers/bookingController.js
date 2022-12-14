import bookingService from "../services/bookingService.js";
import courseService from "../services/courseService.js";

export default {
    async getAllBookings(req, res) {
        try {
            return res.status(200).send(await bookingService.getAllBookings());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getBookingById(req, res) {
        try {
            var course = await bookingService.getBookingById(req.params.id)
            return res.status(200).json({status:200, course: course});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async createBooking (req, res) {
        try{
            var course = await courseService.getClassById(req.body.courseId)
        }catch (e) {
            res.status(501).send(e);
        }

        var bookingData = {
            userId: req.body.userId,
            courseId: req.body.courseId,
            contactNumber: req.body.contactNumber,
            contactEmail: req.body.contactEmail,
            availability: req.body.availability,
            interestMessage: req.body.interestMessage,
            status: req.body.status,
            professorId : course.userId,
            studentName: req.body.studentName,
        }
        try {
            var createdBooking = await bookingService.createBooking(bookingData);
            return res.status(200).json({status:200, createdBooking, message: 'Successfully created a new Booking'});
        } catch (err) {
            res.status(501).send(err);
        }
    },
    async deleteBookingById (req, res) {
        var bookingId = req.body.bookingId;

        try {
            var course = await bookingService.deleteBookingById(bookingId);
            return res.status(200).json({course, message: "Succesfully deleted booking"})

        }catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error getting deleting booking'})
        }
    },
    async updateBooking(req, res) {
        // Id is necessary for the update
        if (!req.params.id) {
            return res.status(400).json({status: 400., message: "Id be present"})
        }
        var Booking = {
            bookingId: req.params.id,
            status: req.body.status,
        }
        try {
            var updatedBooking = await bookingService.updateBooking(Booking)
            return res.status(200).json({status: 200, data: updatedBooking, message: "Succesfully Updated Course Booking"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
    async getBookingsByProfessorId(req, res) {
        try {
            var bookings = await bookingService.getBookingsByProfessorId(req.body.userId)
            return res.status(200).json({status:200, bookings: bookings});
        } catch (err) {
            res.status(500).send(err);
        }
    },
};