import commentService from "../services/commentService.js";

export default {
    async getAllComments(req, res) {
        try {
            return res.status(200).send(await commentService.getAllComments());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getCommentsByCourseId(req, res) {
        try {
            var comment = await commentService.getCommentsByCourseId(req.body.id)
            return res.status(200).json({status:200, comments: comment});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async createComment (req, res) {
        var commentData = {
            studentAuthor: req.body.studentAuthor,
            courseId: req.body.courseId,
            commentText: req.body.commentText
        }
        try {
            var createdComment = await commentService.createComment(commentData);
            return res.status(200).json({status:200, createdComment, message: 'Successfully posted a new comment'});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async deleteCommentById (req, res) { // No anda
        var comment = req.body.commentId;

        try {
            var comment = await commentService.deleteCommentById(comment);
            return res.status(200).json({course, message: "Succesfully deleted comment"})

        }catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error deleting comment'})
        }
    },
    async updateComment(req, res) {
        // Id is necessary for the update
        if (!req.body.commentId) {
            return res.status(400).json({status: 400., message: "Comment be present"})
        }

        var commentData = {
            commentId : req.body.commentId,
            status : req.body.status
        }
        console.log('commentData',commentData)
        try {
            var updatedComment = await commentService.updateComment(commentData)
            return res.status(200).json({status: 200, data: updatedComment, message: "Succesfully Updated Comment"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
}