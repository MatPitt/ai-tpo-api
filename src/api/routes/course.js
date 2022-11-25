import express from 'express';
import courseController from '../../controllers/courseController.js';
import authorization from '../../auth/authorization.js';

var route = express.Router();

export default router => {
    router.use('/courses', route);
    route.get('/', (req, res) => courseController.getAllClasses(req, res));
    route.get('/:id', (req, res) => courseController.getCourseById(req, res));
    route.delete('/:id', (req, res) => courseController.deleteClassById(req, res));
    route.post('/', (req, res) => authorization(req, res,
        () => courseController.createClass(req, res)
    ));
    route.patch('/id', (req, res) => courseController.updateClass(req, res));
    route.post('/:id/comments', (req, res) => courseController.postComment(req, res));
    route.post('/:id/score', (req, res) => courseController.postScore(req, res));
};