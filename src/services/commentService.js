import dbService from './dbService.js';
import Comment from '../models/comment.js';
// TODO: import user model
// TODO: Write query

export default {
    async getAllComments() {
        return await dbService.find(Comment, {});
    },
    async getCommentsByCourseId(id) {
        var comments = await dbService.find(Comment, {courseId:id});
        console.log('comments',comments)
        console.log('id',id)
        return await dbService.find(Comment, {courseId:id});
    },
    async deleteCommentById(id) { // No funciona
        return await dbService.deleteById(id);
    },
    async createComment(comment) { 
        //Creating a new Mongoose Object by using the new keyword
        var newComment = new Comment({
            studentAuthor: comment.studentAuthor,
            courseId: comment.courseId,
            commentText: comment.commentText,
            status: comment.status
        })

        try {
            // Saving the created class
            var savedComment = await newComment.save()
            return savedComment;
        } catch (e) {
            console.log(e);
            throw Error('Error while creating new comment...')
        }
    },
    async updateComment(comment) {
        try {
            var oldComment = await Comment.findById(comment.commentId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class comment...')
        }

        if(!oldComment){
            return false;
        }
        //Edit the User Object
        oldComment.status = comment.status;
        console.log('oldComment new',oldComment)
        try {
            var savedComment = await oldComment.save()
            console.log('savedComment',savedComment)
            return savedComment;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Comment");
        }
    }
};
