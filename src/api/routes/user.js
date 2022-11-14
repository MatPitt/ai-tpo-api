import express from 'express';
import userController from '../../controllers/userController.js';
import studentProfileController from '../../controllers/studentProfileController.js';
var route = express.Router();

export default router => {
    router.use('/users', route);
    route.get('/', (req, res) => userController.getAllUsers(req, res));
    route.get('/:id', (req, res) => userController.getUserById(req, res));
    route.post('/registration', (req, res) => userController.createUser(req, res));
    route.post('/login', (req, res) => userController.loginUser(req, res));
    route.post('/student-registration', (req, res) => studentProfileController.createStudentProfile(
            req, res, () => userController.updateUser(req, res))
    );

};
