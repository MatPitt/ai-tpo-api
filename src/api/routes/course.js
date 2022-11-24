import express from 'express';
import courseController from '../../controllers/courseController.js';
var route = express.Router();

export default router => {
    router.use('/courses', route);
    route.get('/', (req, res) => courseController.getAllClasses(req, res));
    route.get('/:id', (req, res) => courseController.getClassesById(req, res));
    route.delete('/:id', (req, res) => courseController.deleteClassesById(req, res));
    route.post('/', (req, res) => courseController.createClass(req, res));
    route.patch('/id', (req, res) => courseController.updateClass(req, res));
};