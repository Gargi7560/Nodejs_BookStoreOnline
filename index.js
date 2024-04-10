const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/BookRoutes");
const authorRoutes = require("./routes/AuthorRoutes");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Middleware for parsing JSON bodies

// Connecting to the bookstoreonline database in MongoDB using mongoose
mongoose
  .connect("mongodb://localhost:27017/bookstoreonline")
  .then(() => console.log("Connected to MongoDB...")) // Success message if database connection is successful
  .catch((err) => console.error("Could not connect to MongoDB...", err)); // Error message if database connection fails

// Use the book and authors routes
app.use("/api/authors", authorRoutes);
app.use("/api", bookRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
