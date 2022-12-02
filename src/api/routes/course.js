import express from 'express';
import courseController from '../../controllers/courseController.js';
import authorization from '../../auth/authorization.js';
import profileController from "../../controllers/profileController.js";

var route = express.Router();

export default router => {
    router.use('/courses', route);
    route.get('/', (req, res) => courseController.getAllClasses(req, res));
    route.get('/professor-courses', (req, res) => authorization(req, res,
        () => courseController.getProfessorCourses(req, res)));
    route.get('/student-courses', (req, res) => authorization(req, res,
        () => courseController.getStudentCourses(req, res)));
    route.post('/enroll-student', (req, res) => authorization(req, res,
        () => courseController.enrollStudent(req, res)));
    route.get('/:id', (req, res) => courseController.getCourseById(req, res));
    route.delete('/:id', (req, res) => courseController.deleteClassById(req, res));
    route.post('/', (req, res) => authorization(req, res,
        () => courseController.createClass(req, res,
            () => profileController.addNewCourseToProfile(req, res))));
    route.put('/update', (req, res) => authorization(req, res,
        () => courseController.updateClass(req, res)));
    route.post('/:id/comments', (req, res) => courseController.postComment(req, res));
    route.post('/:id/score', (req, res) => courseController.postScore(req, res));
};