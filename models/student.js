const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var deepPopulate = require("mongoose-deep-populate")(mongoose);

var BooksGiven = new Schema(
  {
    level: String,
    books: [{ type: mongoose.Types.ObjectId, ref: "Book" }]
  },
  { _id: false }
);

const studentSchema = new Schema(
  {
    avartar: String,
    applicationID: String,
    exams_number: String,
    surname: { type: String, required: true },
    otherNames: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    contact: { type: mongoose.Types.ObjectId, ref: "Contact" },
    qualification: [String],
    entrylevel: String,
    currentlevel: String,
    programme: {
      type: mongoose.Types.ObjectId,
      ref: "Programme",
      required: false
    },
    booksGiven: [BooksGiven]
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
    timestamps: true
  }
);

studentSchema.plugin(deepPopulate, {} /* more on options below */);

module.exports = mongoose.model("Student", studentSchema);
