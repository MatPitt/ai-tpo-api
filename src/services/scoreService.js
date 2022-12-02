import dbService from './dbService.js';
import Score from '../models/Score.js';
// TODO: import user model
// TODO: Write query

export default {
    async getAllScores() {
        return await dbService.find(Score, {});
    },
    async getScoreByCourseId(id) {
        var scores = await dbService.find(Score, {courseId:id});
        var totalScore = 0.0;
        scores.forEach((element) => {
            totalScore += element.score;
        });
        totalScore = totalScore / scores.length
        return totalScore;
    },
    async postScore(score) { 
        //Creating a new Mongoose Object by using the new keyword
        var newScore = new Score({
            studentAuthor: score.studentAuthor,
            courseId: score.courseId,
            score: score.score,
        })
        
        var existingScore = await dbService.find(Score, {studentAuthor:score.studentAuthor, courseId: score.courseId});
        if (existingScore.length!=0) {
            throw Error('Score already exists for this course')
        }

        try {
            // Saving the created class
            var savedScore = await newScore.save()
            return savedScore;
        } catch (e) {
            console.log(e);
            throw Error('Error while posting score...')
        }
    },
    async updateScore(score) {
        try {
            var oldScore = await dbService.find(Score, {studentAuthor:score.studentAuthor, courseId: score.courseId});
            var updateScore = await dbService.findById(Score, oldScore[0]._id)
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class score...')
        }
        if(!updateScore){
            return false;
        }
        //Edit the User Object
        updateScore.score = score.score;
        console.log('oldScore new',oldScore)
        try {
            var savedScore = await updateScore.save()
            return savedScore;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating score");
        }
    }
};
