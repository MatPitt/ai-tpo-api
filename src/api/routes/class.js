import express from 'express';
import classController from '../../controllers/classController.js';
var route = express.Router();

export default router => {
    router.use('/classes', route);
    route.get('/', (req, res) => classController.getAllClasses(req, res));
    route.get('/:id', (req, res) => classController.getClassesById(req, res));
    route.delete('/:id', (req, res) => classController.deleteClassesById(req, res));
    route.post('/', (req, res) => classController.createClass(req, res));
    route.patch('/id', (req, res) => classController.updateClass(req, res));
};