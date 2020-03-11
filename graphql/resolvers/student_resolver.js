const Student = require("../../models/student");

var $this = (module.exports = {
  createStudent: args => {
    return new Promise((resolve, reject) => {
      const Students = new Student({
        avartar: args.studentInput.avartar,
        applicationID: args.studentInput.applicationID,
        exams_number: args.studentInput.exams_number,
        surname: args.studentInput.surname,
        otherNames: args.studentInput.otherNames,
        dob: args.studentInput.dob,
        gender: args.studentInput.gender,
        contact: args.studentInput.contactID,
        qualification: args.studentInput.qualification,
        entrylevel: args.studentInput.entrylevel,
        currentlevel: args.studentInput.currentlevel,
        programme: args.studentInput.programme,
        booksGiven: args.studentInput.booksGiven
      });
      return Students.save()
        .then(newStudent => {
          console.log(newStudent);
          return resolve($this.getAllStudents());
        })
        .catch(err => {
          console.log(err);
          throw err;
        });
    });
  },

  updateStudent: async args => {
    const modifiedStudent = {
      avartar: args.studentInput.avartar,
      applicationID: args.studentInput.applicationID,
      exams_number: args.studentInput.exams_number,
      surname: args.studentInput.surname,
      otherNames: args.studentInput.otherNames,
      dob: args.studentInput.dob,
      gender: args.studentInput.gender,
      contact: args.studentInput.contactID,
      qualification: args.studentInput.qualification,
      entrylevel: args.studentInput.entrylevel,
      currentlevel: args.studentInput.currentlevel,
      programme: args.studentInput.programmeID,
      booksGiven: args.studentInput.booksGiven
    };
    const res = await Student.findByIdAndUpdate(args.studentID, modifiedStudent, function (
      err,
      updateDoc
    ) {
      console.log(`Updated Doc: ${updateDoc} `);
      return $this.getAllStudents();
    });
  },

  deleteStudent: ({ studentID }) => {
    return Student.findByIdAndDelete(studentID, function (err, deletedDoc) {
      if (err) return handleError(err);
      // deleted at most one tank document
      console.log(`Student with id: ${deletedDoc.id} has been deleted`);
      return $this.getAllBooks();
    });
  },

  student: studentID => {
    return new Promise((resolve, reject) => {
      return Student.findById(studentID)
        .deepPopulate([
          "programme",
          "booksGiven.books",
          "programme.details.Courses",
          "programme.details.Courses.books"
        ])
        .exec(function (err, allStudents) {
          return resolve(allStudents);
        });
    });
  },

  allStudents: () => {
    return new Promise((resolve, reject) => {
      return Student.find()
        .deepPopulate([
          "programme",
          "booksGiven.books",
          "programme.details.Courses",
          "programme.details.Courses.books"
        ])
        .exec(function (err, allStudents) {
          return resolve(allStudents);
        });
    });
  },

  searchStudent: args => {
    return new Promise((resolve, reject) => {
      console.log(`Search for: ${args.searchText}`);
      Student.find({
        $or: [
          { surname: { $regex: ".*" + args.searchText + ".*", $options: "i" } },
          {
            otherNames: { $regex: ".*" + args.searchText + ".*", $options: "i" }
          },
          {
            applicationID: {
              $regex: ".*" + args.searchText + ".*",
              $options: "i"
            }
          },
          {
            exams_number: {
              $regex: ".*" + args.searchText + ".*",
              $options: "i"
            }
          }
        ]
      })
        .deepPopulate([
          "programme",
          "booksGiven.books",
          "programme.details.Courses",
          "programme.details.Courses.books"
        ])
        .exec(function (err, allStudents) {
          return resolve(allStudents);
        });
    });
  }
});
