import dbService from './dbService.js';
import Course from '../models/course.js';

// TODO: import user model
// TODO: Write query

export default {
    async getAllClasses() {
        return await dbService.find(Course, {
            is_deleted: false,
            published: true,
        });
    },
    async getClassById(id) {
        var course = await  dbService.findById(Course, id);
        console.log('course',course)
        return course
    },
    async createClass(course) { //no se puede usar class como nombre de un parametro
        //Creating a new Mongoose Object by using the new keyword
        console.log('course',course)
        var newClass = new Course({
            userId: course.userId,
            name: course.name,
            subject: course.subject,
            frequency: course.frequency,
            duration: course.duration,
            cost: course.cost,
            description: course.description,
            classType: course.classType,
            professorLastname : course.professorLastname,
            professorName : course.professorName,
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
            var oldClass = await Course.findById(course.courseId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class...')
        }

        if(!oldClass){
            return false;
        }
        console.log('oldClass old',oldClass)
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
        oldClass.is_deleted=course.is_deleted ? course.is_deleted : oldClass.is_deleted;
        console.log('oldClass new',oldClass)
        try {
            var savedClass = await oldClass.save()
            console.log('savedClass',savedClass)
            return savedClass;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Class");
        }
    },

    async deleteClassById(id) {
        return await dbService.deleteById(Course, id);
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
                userId: userId,
                is_deleted: false
            });
            return courses
        } catch (e) {
            console.log(e)
            throw Error('Error while creating user...')
        }
    },
    async getStudentCourses(userId) {
        try {
            var courses = await Course.find({
                is_deleted: false,
                published: true
            });
            var filteredCourses = courses.filter( c => c.enrolledStudents.includes(userId) )
            return filteredCourses
        } catch (e) {
            console.log(e)
            throw Error('Error while creating user...')
        }
    },
    async enrollStudent(enrollData) {
        try {
            var oldClass = await dbService.findById(Course, enrollData.courseId);
        } catch (e) {
            console.log(e);
            throw Error('Error ocurred while searching for the class...')
        }
        console.log('oldClass',oldClass)
        if(!oldClass){
            return false;
        }
        //Edit the User Object
        oldClass.enrolledStudents.push(enrollData.studentId);
        console.log('oldClass',oldClass)
        try {
            var savedClass = await oldClass.save()
            console.log('savedClass',savedClass)
            return savedClass;
        } catch (e) {
            console.log(e)
            throw Error("And Error occured while updating the Class Score");
        }
    },
};
