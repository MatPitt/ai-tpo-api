import express from 'express';
import bookingController from '../../controllers/bookingController.js';
import authorization from "../../auth/authorization.js";
var route = express.Router();

export default router => {
    router.use('/bookings', route);
    route.get('/', (req, res) => bookingController.getAllBookings(req, res));
    route.post('/', (req, res) => authorization(req, res,
        () => bookingController.createBooking(req, res)));
    route.delete('/:id', (req, res) => bookingController.deleteBookingById(req, res));
    route.post('/:id', (req, res) => bookingController.updateBooking(req, res));
};