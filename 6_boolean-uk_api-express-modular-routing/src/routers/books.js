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

router.patch('/:id', (req, res) => {
  const userID = parseInt(req.params.id);
  const existingBook = data.books.find((book) => book.id === userID);
  if (!existingBook) {
    res.status(404);
    res.json({ error: 'There is no book with this ID' });
    return;
  }

  if (!req.body.title && !req.body.type && !req.body.author) {
    res.status(400);
    res.json({ error: 'We do not have the book you are looking for' });
  }

  for (const body in req.body) {
    existingBook[body] = req.body[body];
  }

  res.json({ book: existingBook });
});

module.exports = router;
