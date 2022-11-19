import dbService from './dbService.js';
import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// TODO: import user model
// TODO: Write query

export default {
    async getAllUsers() {
        return await dbService.find(User, {});
    },
    async getUserById(id) {
        return await dbService.findById(User, id);
    },
    async createUser(user) {
        //Creating a new Mongoose Object by using the new keyword
        var hashedPassword = bcrypt.hashSync(user.password, 8);
        console.log(user.password)
        var newUser = new User({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            password: hashedPassword,
            phoneNumber: user.phoneNumber,
        })

        try {
            // Saving the user

            var savedUser = await newUser.save()
            var token = jwt.sign({
                    id: savedUser._id,
                },            process.env.SECRET,
                {
                    expiresIn: 86400 // expires in 24 hours
                }
            );
            console.log(token)
            return token;

        } catch (e) {
            console.log(e);
            throw Error('Error while creating user...')
        }
    },
    async updateUser(user) {

        try {
            var oldUser = await User.findById(user.userId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the user...')
        }

        if(!oldUser){
            return false;
        }

        //Edit the User Object
        oldUser.name = user.name ? user.name : oldUser.name;
        oldUser.lastname = user.lastname ? user.lastname : oldUser.lastname;
        oldUser.email = user.email ? user.email : oldUser.email;
        oldUser.phoneNumber = user.phoneNumber ? user.phoneNumber : oldUser.phoneNumber;
        oldUser.password = user.password ? bcrypt.hashSync(user.password, 8) : oldUser.password;
        oldUser.studentProfileId = user.studentProfileId ? user.studentProfileId : oldUser.studentProfileId;

        try {
            var savedUser = await oldUser.save()
            return savedUser;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the User");
        }
    },
    async loginUser(user) {

        // Creating a new Mongoose Object by using the new keyword
        try {
            // Find the User
            console.log("login:",user)
            var _details = await User.findOne({
                email: user.email
            });
            var passwordIsValid = bcrypt.compareSync(user.password, _details.password);

            if (!passwordIsValid) return 0;

            var token = jwt.sign({
                id: _details._id
            }, process.env.SECRET, {
                expiresIn: 86400 // expires in 24 hours
            });
            return {token:token, user:_details};
        } catch (e) {
            console.log(e)
            // return an Error message describing the reason
            throw Error("Error while Login User")
        }

    },
};
