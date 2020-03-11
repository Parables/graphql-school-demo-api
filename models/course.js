const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: String,
    course_code: String,
    facilitators: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Facilitator" }],
    books: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Book" }],
    creditHours: Number
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("Course", courseSchema);
