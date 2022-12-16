import express from 'express';
import userController from '../../controllers/userController.js';
import profileController from '../../controllers/profileController.js';
import uploadPicturesController from "../../controllers/uploadPicturesController.js";
import authorization from '../../auth/authorization.js';
var route = express.Router();


export default router => {
    router.use('/users', route);
    route.get('/', (req, res) => userController.getAllUsers(req, res));
    route.get('/:id', (req, res) => userController.getUserById(req, res));
    route.post('/resetPassword', (req, res) => userController.updatePassword(req, res));
    route.post('/registration', (req, res) => userController.createUser(req, res));
    route.post("/update-profile-picture", (req, res) => authorization(req, res ,
        () => uploadPicturesController.uploadFiles(req, res,
            () => userController.updateUser(req, res)))
    );
    route.post('/login', (req, res) => userController.loginUser(req, res));
    route.post('/student-registration', (req, res) => authorization(req,res,
        () => profileController.createStudentProfile(req,res,
            () => userController.updateUser(req, res))
    ));
    route.post('/get-student-profile', (req, res) => authorization(req, res,
        () => profileController.getStudentProfileByUserId(req, res))
    );
    route.post('/professor-registration', (req, res) => authorization(req,res,
        () => profileController.createProfessorProfile(req,res,
            () => userController.updateUser(req, res))
    ));

};
