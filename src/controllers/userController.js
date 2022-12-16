//import mongooseService from "../services/mongoose.js";
import userService from '../services/userService.js';

export default {
    async getAllUsers(req, res) {
        try {
            return res.status(200).send(await userService.getAllUsers());
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getUserById(req, res) {
        try {
            return res
                .status(200)
                .send(await userService.getUserById(req.params.id));
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async createUser(req, res) {

        //req.body contains the form submitted values
        var user = {
            name: req.body.name,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password,
            securityAnswer: req.body.securityAnswer,
            phoneNumber: req.body.phoneNumber,
            studentProfileId: req.body.studentProfileId,
            professorProfileId: req.body.professorProfileId,
        }
        var is_user = await userService.getUserByEmail(user)
        console.log('is_user',is_user)
        if(!is_user){
            return res.status(501).json({status:501, message: 'Error creating user, email already in use!'});
        }
        try {
            var createdUserToken = await userService.createUser(user);
            return res.status(200).json({status:200, createdUserToken, message: 'Successfully created a User'});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async loginUser(req, res) {
        //req.body contains the form submitted values
        var user = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            var loginUser = await userService.loginUser(user);
            if (loginUser===0)
                return res.status(400).json({message: "Error en la contraseña"})
            else
                return res.status(201).json({loginUser, message: "Succesfully login"})
        } catch (e) {
            //Return an Error Response Message with Code and the Error Message.
            return res.status(400).json({status: 400, message: "Invalid username or password"});
        }
    },
    async updateUser(req, res) {
        // Id is necessary for the update
        if (!req.body.userId) {
            return res.status(400).json({status: 400., message: "Name be present"})
        }

        var User = {
            userId : req.body.userId,
            name: req.body.name,
            lastname: req.body.lastname,
            password: req.body.password,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            studentProfileId: req.body.studentProfileId,
            professorProfileId: req.body.professorProfileId,
            profilePictureReference: req.body.profilePictureReference
        }
        try {
            var updatedUser = await userService.updateUser(User)
            return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
    async updatePassword(req, res) {
        if (!req.body.securityAnswer) {
            return res.status(400).json({status: 400., message: "Answer must be present"})
        }

        var User = {
            email: req.body.email,
        }

        var is_user = await userService.getUserByEmail(User)

        is_user = is_user[0]

        is_user.password = req.body.newPassword
        
        try {
            if (req.body.securityAnswer===is_user.securityAnswer) {
                var updatedUser = await userService.updateUser(is_user)
                return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated Password"})
            }
        } catch (e) {
            return res.status(400).json({status: 400., message: e.message})
        }
    },
};
