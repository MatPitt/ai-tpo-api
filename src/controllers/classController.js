import classService from "./services/classService";

export default {
    async getAllClasses(req, res) {
        try {
            return res.status(200).send(await userService.getAllClasses());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async createClass (req, res) {
        var classData = {
            name: req.body.name,
            subject: req.body.subject,
            frequency: req.body.frequency,
            duration: req.body.duration,
            cost: req.body.cost,
            published: req.body.published,
            description: req.body.description,
            classType: req.body.classType
        }
        try {
            var createdClass = await classService.createClass(classData);
            return res.status(200).json({status:200, createdClass, message: 'Successfully created a new Class'});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    
    async getClassesById (req, res) {
        var classId = req.body.classId;

        try {
            var course = await classService.getClassById(classId);
            return res.status(200).json({course, message: "Succesfully login"})

        }catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error getting Student Profile'})
        }
    },
        
    async deleteClassesById (req, res) {
        var classId = req.body.classId;

        try {
            var course = await classService.deleteClassesById(classId);
            return res.status(200).json({course, message: "Succesfully deleted class"})

        }catch (e) {
            console.log(e)
            return res.status(400).json({status: 400, message: 'Error getting deleting class'})
        }
    },

    async updateClass(req, res) {
        // Id is necessary for the update
        if (!req.body.classId) {
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
            bookedClasses: req.body.bookedClasses
        }
        try {
            var updatedUser = await classService.updateUser(classData)
            return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated Class"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
}