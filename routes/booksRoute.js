import express from "express";
import {DB} from '../models/bookmodel.js'
const router = express.Router();

router.post("/books", async (req, res) => {
  try {
    if (!req.body.book || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "Invalid format send all in format" });
    }

    const newBook = {
      book: req.body.book,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await DB.create(newBook);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//getting all books from database
router.get("/books", async (req, res) => {
  try {
    const books = await DB.find({});

    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.put("/books/:id", async (req, res) => {
  try {
    if (!req.body.book || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields: titel , author , publishYear",
      });
    }

    const { id } = req.params;
    const result = await DB.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }

    return res.status(200).json({ message: "Book updated succesfully " });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//Route for getting one book from database
router.get("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const books = await DB.find({});

    const book = await DB.findByIdAndDelete(id);

    return res.status(200).json({ book });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.delete("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await DB.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).send({ message: "BOok deleted successfully " });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//My way of deleting stuff
router.delete("/books/delete", async (req, res) => {
  try {
    const id = [];
    const books = await DB.find({});

    books.forEach((book) => {
      id.push(book._id);
    });

    const book = await DB.findByIdAndDelete(id[0]);

    return res.status(200).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

router.get("/books/test", (req, res) => {
  // console.log(req);
  return res.status(234).send("Welcom to MERN Stack Tutorial");
});

 

export default router;