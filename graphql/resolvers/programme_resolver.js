const Programme = require("../../models/programme");
const Student = require("../../models/student");
const Course = require("../../models/course");

var $this = (module.exports = {
  createProgramme: args => {
    return new Promise((resolve, reject) => {
      const programme = new Programme({
        title: args.programmeInput.title,
        programme_code: args.programmeInput.programme_code,
        duration: args.programmeInput.duration,
        startLevel: args.programmeInput.startLevel,
        endLevel: args.programmeInput.endLevel,
        certification: args.programmeInput.certification,
        details: args.programmeInput.details
      });
      return programme
        .save()
        .then(newProgramme => {
          console.log(newProgramme);
          return resolve($this.getAllProgrammes());
        })
        .catch(err => {
          console.log(`There was an error adding the new programme: ${err}`);
          throw err;
        });
    });
  },

  updateProgramme: args => {
    return new Promise((resolve, reject) => {
      const programme = {
        title: args.programmeInput.title,
        programme_code: args.programmeInput.programme_code,
        duration: args.programmeInput.duration,
        startLevel: args.programmeInput.startLevel,
        endLevel: args.programmeInput.endLevel,
        certification: args.programmeInput.certification,
        details: args.programmeInput.details
      };
      console.log(args.programmeID);
      return Programme.findByIdAndUpdate(
        args.programmeID,
        { $set: programme },
        function (err, updatedDoc) {
          console.log(`Updated Prgramme: ${updatedDoc}`);
          return resolve($this.getAllProgrammes());
        }
      );
    });
  },

  deleteProgramme: args => {
    return new Promise((resolve, reject) => {
      return Programme.findByIdAndDelete(args.programmeID,
        function (err, deletedDoc) {
          console.log(`The Programme with the ID: ${deletedDoc} has been deleted`);
          return resolve($this.getAllProgrammes());
        });
    });
  },

  allProgrammes: () => {
    return new Promise((resolve, reject) => {
      Programme.find()
        .deepPopulate(["details.Courses", "details.Courses.books"])
        .exec(function (err, allProgrammes) {
          return resolve(allProgrammes);
        });
    });
  }
});
