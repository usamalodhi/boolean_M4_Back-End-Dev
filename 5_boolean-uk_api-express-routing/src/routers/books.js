const express = require('express');
const router = express.Router();
const { books } = require('../../data.js');
let bookId = books.length;

// GET / books;
router.get('/', (req, res) => {
  res.json({ books });
});

// GET /books/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const book = books.find((book) => book.id === id);

  res.json({ book });
});

// POST /books
router.post('/', (req, res) => {
  bookId++;

  const book = {
    ...req.body,
    id: bookId,
  };

  books.push(book);

  res.json({ book: book });
});

module.exports = router;
