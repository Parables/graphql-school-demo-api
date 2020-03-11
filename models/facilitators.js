const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const facilitatorSchema = new Schema(
  {
    avartar: { type: String, required: false },
    surname: { type: String, required: true },
    otherNames: { type: String, required: true },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    contact: { type: mongoose.SchemaTypes.ObjectId, ref: "Contact" },
    qualifications: [String],
    courses: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Course" }]
  },
  {
    versionKey: false,
    timestamps: true
  }
);

module.exports = mongoose.model("Facilitator", facilitatorSchema);
