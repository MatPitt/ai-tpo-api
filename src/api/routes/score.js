import express from 'express';
import scoreController from '../../controllers/scoreController.js';
import authorization from "../../auth/authorization.js";

var route = express.Router();

export default router => {
    router.use('/score', route);
    route.get('/', (req, res) => scoreController.getAllScores(req, res));
    route.post('/', (req, res) => authorization(req, res,
        () => scoreController.postScore(req, res)));
    route.patch('/', (req, res) => scoreController.updateScore(req, res));
    route.get('/course', (req, res) => scoreController.getScoreByCourseId(req, res));
};