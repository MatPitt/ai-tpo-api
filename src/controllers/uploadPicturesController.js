import Formidable from 'formidable';
import bluebird from 'bluebird'
import fs_default from 'fs'
var fs = bluebird.promisifyAll(fs_default)
import {join} from 'path';
import imgUploaderService from '../services/imgUploaderService.js'


// Returns true if successful or false otherwise
async function checkCreateUploadsFolder (uploadsFolder) {
    try
    {
        await fs.statAsync(uploadsFolder)
    }
    catch (e)
    {
        if (e && e.code == 'ENOENT')
        {
            console.log('The uploads folder doesn\'t exist, creating a new one...')
            try
            {
                await fs.mkdirAsync(uploadsFolder)
            }
            catch (err)
            {
                console.log('Error creating the uploads folder 1')
                return false
            }
        }
        else
        {
            console.log('Error creating the uploads folder 2')
            return false
        }
    }
    return true
}

// Returns true or false depending on whether the file is an accepted type
function checkAcceptedExtensions (file){
    const type = file.mimetype.split('/').pop()
    const accepted = ['jpeg', 'jpg', 'png', 'gif', 'pdf','webp']
    if (accepted.indexOf(type) == -1) {
        return false
    }
    return true
}

export default {
    async uploadFiles (req, res, next) {
        let form = new Formidable.IncomingForm()
        //console.log("form",form);
        const uploadsFolder = process.env.UPLOAD_DIR || 'images'
        //console.log("uploadFolder",uploadsFolder);
        form.multiples = true
        form.uploadDir = uploadsFolder
        form.maxFileSize = 50 * 1024 * 1024 // 50 MB
        const folderCreationResult = await checkCreateUploadsFolder(uploadsFolder)
        if (!folderCreationResult) {
            return res.json({ok: false, msg: "The uploads folder couldn't be created"})
        }
        form.parse(req, async (err, fields, files) => {
            let myUploadedFiles = []
            var fileName = ''
            if (err) {
                console.log('Error parsing the incoming form',err)
                return res.json({ok: false, msg: 'Error passing the incoming form'})
            }
            // If we are sending only one file:
            if (!files.files.length) {
                const file = files.files
                if (!checkAcceptedExtensions(file)) {
                    console.log('The received file is not a valid type')
                    return res.json({ok: false, msg: 'The sent file is not a valid type'})
                }
                fileName = encodeURIComponent(file.originalFilename.replace(/&. *;+/g, '-'))
                myUploadedFiles.push(fileName)
                try {
                    await fs.renameAsync(file.filepath, join(uploadsFolder, fileName))

                } catch (e) {
                    console.log(e)
                    console.log('Error uploading the file')
                    try { await fs.unlinkAsync(file.path) } catch (e) {}
                    return res.json({ok: false, msg: 'Error uploading the file'})
                }
            }

            var imgUrl = await imgUploaderService.createUserImg(join(uploadsFolder, fileName))
            console.log('imgUrl',imgUrl)
            req.body.profilePictureReference = imgUrl

            next()
        })
    },
}

