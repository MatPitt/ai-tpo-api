import user from './routes/user.js';
import course from './routes/course.js';
import express from 'express';

// guaranteed to get dependencies
export default () => {
    const router = express.Router();
    user(router);
    course(router);
    return router;
};
