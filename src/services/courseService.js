import dbService from './dbService.js';
import Course from '../models/course.js';
import ProfessorProfile from "../models/professorProfile.js";
// TODO: import user model
// TODO: Write query

export default {
    async getAllClasses() {
        return await dbService.find(Course, {});
    },
    async getClassById(id) {
        return await dbService.findById(Course, id);
    },
    async createClass(course) { //no se puede usar class como nombre de un parametro
        //Creating a new Mongoose Object by using the new keyword
        var newClass = new Course({
            userId: course.userId,
            name: course.name,
            subject: course.subject,
            frequency: course.frequency,
            duration: course.duration,
            cost: course.cost,
            description: course.description,
            classType: course.classType
        })

        try {
            // Saving the created class
            var savedClass = await newClass.save()
            return savedClass;
        } catch (e) {
            console.log(e);
            throw Error('Error while creating new class...')
        }
    },
    async updateClass(course) {

        try {
            var oldClass = await Course.findById(course.userId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class...')
        }

        if(!oldClass){
            return false;
        }
        //Edit the User Object
        oldClass.name=course.name ? course.name : oldClass.name;
        oldClass.subject=course.subject ? course.subject : oldClass.subject;
        oldClass.frequency=course.frequency ? course.frequency : oldClass.frequency;
        oldClass.duration=course.duration ? course.duration : oldClass.duration;
        oldClass.cost=course.cost ? course.cost : oldClass.cost;
        oldClass.published=course.published ? course.published : oldClass.published;
        oldClass.description=course.description ? course.description : oldClass.description;
        oldClass.enrolledStudents=course.enrolledStudents ? course.enrolledStudents : oldClass.enrolledStudents;
        oldClass.comments=course.comments ? course.comments : oldClass.comments;
        oldClass.score=course.score ? course.score : oldClass.score;
        oldClass.classType=course.classType ? course.classType : oldClass.classType;
        oldClass.bookedClasses=course.bookedClasses ? course.bookedClasses : oldClass.bookedClasses;

        try {
            var savedClass = await oldUser.save()
            return savedClass;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Class");
        }
    },

    async deleteClassById(id) {
        return await dbService.deleteById(Course, id);
    },

    async postComment(course) {
        try {
            var oldClass = await dbService.findById(Course, course.classId);
            console.log(oldClass);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class...')
        }

        if(!oldClass){
            return false;
        }
        //Edit the User Object
        oldClass.comments=course.comments;

        try {
            var savedClass = await oldClass.save()
            return savedClass;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Class");
        }
    },

    async postScore(course) {
        try {
            var oldClass = await dbService.findById(Course, course.classId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class...')
        }

        if(!oldClass){
            return false;
        }
        //Edit the User Object
        oldClass.score=course.score;

        try {
            var savedClass = await oldClass.save()
            return savedClass;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Class Score");
        }
    },
    async getProfessorCourses(userId) {
        console.log('userId looking courses',userId)
        try {
            var courses = await Course.find({
                userId: userId
            });
            console.log('Courses found: ',courses)
            return courses
        } catch (e) {
            console.log(e)
            throw Error('Error while creating user...')
        }
    },
};
