import StudentProfile from '../models/studentProfile.js';


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


    }
}

