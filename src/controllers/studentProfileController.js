import studentProfileService from '../services/studentProfileService.js';

export default {
    async createStudentProfile (req, res, next) {
        var StudentProfile = {
            userId: req.body.userId,
            birthdate: req.body.birthdate
        }

        try {
            var createdStudentProfile = await studentProfileService.createStudentProfile(StudentProfile);
            req.body.studentProfileId = createdStudentProfile._id
            next();
        } catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error creating Student Profile'})
        }
    },

}