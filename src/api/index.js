import user from './routes/user.js';
import course from './routes/course.js';
import booking from './routes/booking.js';
import comments from './routes/comments.js';
import express from 'express';

// guaranteed to get dependencies
export default () => {
    const router = express.Router();
    user(router);
    course(router);
    booking(router);
    comments(router);
    return router;
};
