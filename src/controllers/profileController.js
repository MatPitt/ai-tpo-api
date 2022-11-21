import profileService from '../services/profileService.js';

export default {
    async createStudentProfile (req, res, next) {
        var StudentProfile = {
            userId: req.body.userId,
            birthdate: req.body.birthdate
        }

        try {
            var createdStudentProfile = await profileService.createStudentProfile(StudentProfile);
            req.body.studentProfileId = createdStudentProfile._id
            next();
        } catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error creating Student Profile'})
        }
    },

    async getStudentProfileByUserId (req, res) {
        var userId = req.body.userId;

        try {
            var studentProfile = await profileService.getStudentProfileById(userId);
            return res.status(200).json({studentProfile, message: "Succesfully login"})

        }catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error getting Student Profile'})
        }
    },

    async createProfessorProfile (req, res, next) {
        var ProfessorProfile = {
            userId: req.body.userId,
            workExperience: req.body.workExperience,
            titles: req.body.titles
        }

        try {
            var createProfessorProfile = await profileService.createProfessorProfile(ProfessorProfile);
            req.body.professorProfileId = createProfessorProfile._id
            console.log(createProfessorProfile._id)
            next();
        } catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error creating Professor Profile'})
        }
    },
}