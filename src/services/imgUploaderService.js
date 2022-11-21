// Gettign the Newly created Mongoose Model we just created
//var UserImg = require('../models/UserImg.model');
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//configurar cloudinary
import cloudinary from 'cloudinary';
cloudinary.config({
    cloud_name: 'dds4q5mx8',
    api_key: '291885268973272',
    api_secret: 'ATI1-BxNdxVoO_Og7RG6WL0KexM'
});


export default {
    async createUserImg (userImg) {
        try{
            //subir imagen a cloudinary
            var cloudinary_response = ''
            cloudinary_response = await cloudinary.uploader.upload(userImg, function(result) {
                console.log("Resultado",result);
            });
            return cloudinary_response.url
        } catch (e) {
            throw Error ('Error uploading to cloudinary')
        }

    },
}




