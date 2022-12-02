import courseService from "../services/courseService.js";
import userService from "../services/userService.js";

export default {
    async getAllClasses(req, res) {
        try {
            return res.status(200).send(await courseService.getAllClasses());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async createClass (req, res, next) {
        try {
            var userData = await userService.getUserById(req.body.userId)

        }catch (e) {
            res.status(500).send(e);
        }
        console.log('userData',userData)
        var classData = {
            userId : req.body.userId,
            name: req.body.name,
            subject: req.body.subject,
            frequency: req.body.frequency,
            duration: req.body.duration,
            cost: req.body.cost,
            description: req.body.description,
            classType: req.body.classType,
            professorLastname : userData.lastname,
            professorName : userData.name,
        }
        try {
            var createdClass = await courseService.createClass(classData);
            req.body.newCourseId = createdClass._id
            next()
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    async getCourseById(req, res) {
        try {
            var course = await courseService.getClassById(req.params.id)
            return res.status(200).json({status:200, course: course});
        } catch (err) {
            res.status(500).send(err);
        }
    },
        
    async deleteClassById (req, res) {
        var classId = req.body.classId;

        try {
            var course = await courseService.deleteClassById(classId);
            return res.status(200).json({course, message: "Succesfully deleted class"})

        }catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error getting deleting class'})
        }
    },

    async updateClass(req, res) {
        console.log('body',req.body.courseId)
        // Id is necessary for the update
        if (!req.body.courseId) {
            return res.status(400).json({status: 400., message: "Class be present"})
        }

        var classData = {
            name: req.body.name,
            subject: req.body.subject,
            frequency: req.body.frequency,
            duration: req.body.duration,
            cost: req.body.cost,
            published: req.body.published,
            description: req.body.description,
            enrolledStudents: req.body.enrolledStudents,
            comments:req.body.comments,
            score:req.body.score,
            classType: req.body.classType,
            bookedClasses: req.body.bookedClasses,
            is_deleted : req.body.is_deleted,
            courseId : req.body.courseId
        }
        console.log('classData',classData)
        try {
            var updatedClass = await courseService.updateClass(classData)
            return res.status(200).json({status: 200, data: updatedClass, message: "Succesfully Updated Class"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },

    async postComment(req, res) {
        // Id is necessary for the update
        if (!req.body.classId) {
            return res.status(400).json({status: 400., message: "Class be present"})
        }
        var commentData = {
            userId: req.body.userId,
            classId: req.body.classId,
            comments: req.body.comments
        }
        try {
            var updatedUser = await courseService.postComment(commentData)
            return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Added Comment"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
    
    async postScore(req, res) {
        // Id is necessary for the update
        if (!req.body.classId) {
            return res.status(400).json({status: 400., message: "Class be present"})
        }
        var scoreData = {
            userId: req.body.userId,
            classId: req.body.classId,
            score: req.body.score
        }
        try {
            var updatedUser = await courseService.postScore(scoreData)
            return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Added Score"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
    async getProfessorCourses(req, res) {
        try {
            return res.status(200).send(await courseService.getProfessorCourses(req.body.userId));
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getStudentCourses(req, res) {
        try {
            return res.status(200).send(await courseService.getStudentCourses(req.body.userId));
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async enrollStudent(req, res) {
        console.log('Inside enroll')
        var enrollData = {
            studentId: req.body.studentId,
            courseId : req.body.courseId
        }
        try {
            var updatedCourse = await courseService.enrollStudent(enrollData)
            return res.status(200).json({status:200,updatedCourse});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
}