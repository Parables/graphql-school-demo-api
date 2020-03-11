const Course = require("../../models/course");
const mongoose = require("mongoose");

const $this = (module.exports = {
  createCourse: args => {
    return new Promise((resolve, reject) => {
      const course = new Course({
        name: args.courseInput.name,
        course_code: args.courseInput.course_code,
        facilitators: args.courseInput.facilitators,
        books: args.courseInput.books,
        creditHours: args.courseInput.creditHours
      });

      course
        .save()
        .then(newCourse => {
          console.log(newCourse);
          return resolve($this.getAllCourses());
        })
        .catch(err => {
          console.error(err);
          throw err;
        });
    });
  },

  updateCourse: args => {
    return new Promise((resolve, reject) => {
      const course = {
        name: args.courseInput.name,
        course_code: args.courseInput.course_code,
        facilitators: args.courseInput.facilitators,
        books: args.courseInput.books,
        creditHours: args.courseInput.creditHours
      };
      console.info(`Course ID: ${args.courseID}`);
      return Course.findByIdAndUpdate(args.courseID, { $set: course }, function (
        err,
        updatedCourse
      ) {
        console.info(`Updated Course: ${updatedCourse}`);
        return resolve($this.getAllCourses());
      });
    });
  },

  deleteCourse: args => {
    return new Promise((resolve, reject) => {
      return Course.findByIdAndDelete(args.courseID, function (err, deletedDoc) {
        console.log(`The Course with the ID: ${deletedDoc} has been deleted`);
        return resolve($this.getAllCourses());
      });
    });
  },

  allCourses: () => {
    return new Promise((resolve, reject) => {
      return Course.find()
        .populate("books")
        .then(allCourses => {
          console.log(allCourses);
          return resolve(allCourses);
        });
    });
  },

  course: args => {
    return new Promise((resolve, reject) => {
      Course.findById(args.courseID)
        .populate("books")
        .then(allCourses => {
          console.log(allCourses);
          return resolve(allCourses);
        });
    });
  }
});
