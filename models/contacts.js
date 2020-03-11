const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    phone_numbers: [String],
    email: [String],
    address: [String]
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
    timestamps: true
  }
);

module.exports = mongoose.model("Contact", contactSchema);
