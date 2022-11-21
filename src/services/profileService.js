import StudentProfile from '../models/studentProfile.js';
import ProfessorProfile from '../models/professorProfile.js';


export default {
    async createStudentProfile(userProfile) {
        var newProfile = new StudentProfile({
            userId : userProfile.userId,
            birthdate : userProfile.birthdate,
        })

        try {
            var savedUserProfile = await newProfile.save()
            return savedUserProfile
        } catch (e) {
            console.log(e)
            throw Error('Error while creating user...')
        }
    },
    async getStudentProfileById(userId) {
        try {
            var profile = await StudentProfile.findOne({
                userId: userId
            });
            return profile
        }catch (e) {
            console.log(e)
            throw Error("Error while getting the User student profile")
        }
    },
    async createProfessorProfile(userProfile) {
        var newProfile = new ProfessorProfile({
            userId : userProfile.userId,
            workExperience: userProfile.workExperience,
            titles: userProfile.titles
        })

        try {
            var savedUserProfile = await newProfile.save()
            return savedUserProfile
        } catch (e) {
            console.log(e)
            throw Error('Error while creating user...')
        }
    },
}

