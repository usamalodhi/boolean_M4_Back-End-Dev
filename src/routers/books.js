const express = require('express');
const booksRouter = express.Router();
const db = require('../utils/database');

//GET /books
booksRouter.get('/', (req, res) => {
  const selectAllBooksQuery = 'SELECT * FROM books';
  db.query(selectAllBooksQuery)
    .then((databaseResult) => {
      res.json({ books: databaseResult.rows });
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: 'unexpected Error: 500' });
      console.log(error);
    });
});

//GET /books/:id
booksRouter.get('/:id', (req, res) => {
  const selectSingleBookQuery = 'SELECT * FROM books WHERE id = $1';
  const paramValues = [req.params.id];

  db.query(selectSingleBookQuery, paramValues)
    .then((databaseResult) => {
      if (databaseResult.rowCount === 0) {
        res.status(404);
        res.json({ error: 'book does not exist' });
      } else {
        res.json({ book: databaseResult.rows[0] });
      }
    })
    .catch((error) => {
      res.status(500);
      res.json({ error: 'unexpected Error' });
      console.log(error);
    });
});

//POST /books
booksRouter.post('/', (req, res) => {
  //RETURNING *: return added book as the query response
  //Default: an INSERT will return nothing
  //Send the book back to the client in the API response
  const insertBooksQuery = `
    INSERT INTO books(
      title, 
      type, 
      author,
      topic, 
      publicationDate, 
      pages)
    VALUES($1, $2, $3, $4, $5, $6)
    RETURNING *`;

  const bookValues = [
    req.body.title,
    req.body.type,
    req.body.author,
    req.body.topic,
    req.body.publicationDate,
    req.body.pages,
  ];

  db.query(insertBooksQuery, bookValues)
    .then((databaseResult) => {
      console.log(databaseResult);
      res.json({ book: databaseResult.rows[0] });
    })
    .catch((error) => {
      console.log(error);
      res.status(500);
      res.json({ error: 'unexpected error: 500' });
    });
});

// PUT /books/:id
// PUT is idempotent, meaning the exact same call can be made over and over and will produce the same result.
// This is different than POST, in which the exact same call repeated will continuously make new users with the same data
booksRouter.put('/:id', (req, res) => {
  const id = parseInt(request.params.id);
  const { title, type, author, topic, publicationDate, pages } = request.body;
  const updateBooksQuery = ` 
  UPDATE books
  SET   title = $1,
        type = $2,
        author = $3,
        topic = $4,
        publicatoinDate = $5,
        pages = $6,
  WHERE id = $7`;
  [title, type, author, topic, publicationDate, pages, id],
    db
      .query(updateBooksQuery)
      .then((databaseResult) => {
        console.log(databaseResult);
        res.json({ book: databaseResult.rows[0] });
      })
      .catch((error) => {
        console.log(error);
        response.status(200).send(`User modified with ID: ${id}`);
        res.json({ error: 'unexpected error: 500' });
      });
});

// DELETE /books/:id
booksRouter.delete('/:id', (req, res) => {
  const deleteSingleBookQuery = 'DELETE FROM books WHERE id = $1';
  const paramValues = [req.params.id];
  db.query(deleteSingleBookQuery, paramValues)
    .then((databaseResult) => {
      if (databaseResult.rowCount === 0) {
        res.status(404);
        res.json({ error: 'book does not exist' });
      } else {
        res.json({ book: databaseResult.rows[0] });
      }
    })
    .catch((error) => {
      response.status(200).send(`User deleted with ID: ${id}`);
      res.json({ error: 'unexpected Error' });
      console.log(error);
    });
});

module.exports = booksRouter;
