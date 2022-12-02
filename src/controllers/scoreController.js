import scoreService from "../services/scoreService.js";

export default {
    async getAllScores(req, res) {
        try {
            return res.status(200).send(await scoreService.getAllScores());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getScoreByCourseId(req, res) {
        try {
            var score = await scoreService.getScoreByCourseId(req.body.id)
            return res.status(200).json({status:200, score: score});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async postScore (req, res) {
        var scoreData = {
            studentAuthor: req.body.studentAuthor,
            courseId: req.body.courseId,
            score: req.body.score
        }
        try {
            var createdScore = await scoreService.postScore(scoreData);
            return res.status(200).json({status:200, createdScore, message: 'Successfully posted score'});
        } catch (err) {
            res.status(500).send(err.message);
        }
    },
    async updateScore(req, res) {
        // Id is necessary for the update

        var scoreData = {
            studentAuthor: req.body.studentAuthor,
            courseId: req.body.courseId,
            score: req.body.score
        }
        console.log('scoreData',scoreData)
        try {
            var updatedScore = await scoreService.updateScore(scoreData)
            return res.status(200).json({status: 200, data: updatedScore, message: "Succesfully Updated Score"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
}