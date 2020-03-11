const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

var Details = new Schema({ _id: false }, {
  level: String,
  semesters: [Semester]
});

var Semester = new Schema({ _id: false }, {
  session: String,
  courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }]
});

const programmeSchema = new Schema({
  title: String,
  programme_code: String,
  duration: String,
  startLevel: String,
  endLevel: String,
  certification: String,
  details: [Details]
}, {
  versionKey: false,
  timestamps: true
});
programmeSchema.plugin(deepPopulate, {});

module.exports = mongoose.model("Programme", programmeSchema);
