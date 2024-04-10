const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the Book schema.
const bookSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "Author", // This assumes your Author model is named 'Author'
    required: true,
  },
  yearPublished: {
    type: Date,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  price: {
    type: Number,
  },
});

// Create the model from the schema and export it.
module.exports = mongoose.model("Book", bookSchema);
