const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    cover: { type: String, required: false },
    title: { type: String, required: true },
    book_code: { type: String, required: true },
    author: { type: String, required: false },
    inStock: { type: Number, default: 0 },
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
    timestamps: true
  }
);

module.exports = mongoose.model("Book", bookSchema);
