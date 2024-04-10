const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

// Define the Author schema.
const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  born: {
    type: Date,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
  },
});

// Hash the author's password before saving
authorSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

// Create the model from the schema and export it.
module.exports = mongoose.model("Author", authorSchema);
