const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Author = require("../models/Author");
const router = express.Router();

// POST: Register a new author
router.post("/register", async (req, res) => {
  try {
    const newAuthor = new Author(req.body);
    await newAuthor.save();
    res.status(201).send({ message: "Author registered successfully!" });
  } catch (error) {
    res.status(400).send(error);
  }
});

// POST: Login
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;
    const author = await Author.findOne({ name });

    if (!author) {
      return res
        .status(401)
        .send({ message: "Login failed! Check authentication credentials" });
    }

    const isPasswordMatch = await bcrypt.compare(password, author.password);

    if (!isPasswordMatch) {
      return res
        .status(401)
        .send({ message: "Login failed! Check authentication credentials" });
    }

    // Upon successful login, generate a token
    const token = jwt.sign({ _id: author._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.send({ message: "Logged in successfully!", token });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
