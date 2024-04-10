const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const Author = require("../models/Author");
const authMiddleware = require("../middleware/AuthMiddleware");

// POST: Add a new book
router.post("/books", authMiddleware, async (req, res) => {
  try {
    const book = new Book({
      ...req.body,
      author: req.user._id, // Set the author ID from the JWT
    });
    await book.save();
    res.status(201).send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// GET: Search books by dynamic author's city and publication date range
router.get("/books/search", async (req, res) => {
  // Extract query parameters
  const { city, startDate, endDate } = req.query;
  let query = {};

  // If city is provided, find authors from that city and construct part of the query
  if (city) {
    const authorsFromCity = await Author.find({ city });
    const authorIds = authorsFromCity.map((author) => author._id);
    query.author = { $in: authorIds };
  }

  // If both startDate and endDate are provided, add to query to search within the date range
  if (startDate && endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Ensure the date covers the entire end day by setting time to just before midnight
    end.setHours(23, 59, 59, 999);

    query.yearPublished = { $gte: start, $lte: end };
  }

  try {
    const books = await Book.find(query).populate("author");
    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

// GET: Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find().populate("author");
    res.send(books);
  } catch (error) {
    res.status(500).send();
  }
});

// GET: Get a book by id
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author");
    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

// PATCH: Update a book
router.patch("/books/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      author: req.user._id,
    });
    if (!book) {
      return res.status(404).send({
        message: "Book not found or user not authorized to modify this book",
      });
    }

    // Update book fields
    Object.keys(req.body).forEach(
      (update) => (book[update] = req.body[update])
    );
    await book.save();

    res.send(book);
  } catch (error) {
    res.status(400).send(error);
  }
});

// DELETE: Delete a book
router.delete("/books/:id", authMiddleware, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!book) {
      return res.status(404).send({
        message: "Book not found or user not authorized to delete this book",
      });
    }
    res.send(book);
  } catch (error) {
    res.status(500).send();
  }
});

module.exports = router;
