import express from 'express';
import commentController from '../../controllers/commentController.js';

var route = express.Router();

export default router => {
    router.use('/comments', route);
    route.get('/', (req, res) => commentController.getAllComments(req, res));
    route.post('/', (req, res) => commentController.createComment(req, res));
    route.post('/:id', (req, res) => commentController.updateComment(req, res));
    route.get('/:id', (req, res) => commentController.getCommentsByCourseId(req, res));
    route.get('/approved/:id', (req, res) => commentController.getCourseApprovedComments(req, res));
    route.delete('/:id/comments', (req, res) => commentController.deleteCommentById(req, res)); // No funciona
};