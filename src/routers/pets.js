const express = require('express');
const petsRouter = express.Router();
const db = require('../utils/database');

petsRouter.get('/', (req, res) => {
  console.log('limit', req.query.limit);
  console.log('offset', req.query.offset);

  let limit = req.query.limit === undefined ? 20 : req.query.limit;
  limit < 10 && limit === 10;
  limit > 50 && limit === 50;

  let offset = req.query.offset === undefined ? 1 : req.query.offset;
  const databaseQuery = `SELECT * FROM pets LIMIT ${limit} OFFSET ${offset}`;
  db.query(databaseQuery)
    .then((databaseResult) => {
      res.json({ data: databaseResult.rows });
    })
    .catch((err) => {
      res.status(404);
      res.json({ error: 'unexpected Error' });
    });
});

petsRouter.get('/:id', (req, res) => {
  const databaseQuery = 'SELECT * FROM pets WHERE id = $1';
  const queryValues = [req.params.id];
  db.query(databaseQuery, queryValues)
    .then((databaseResult) => {
      if (databaseResult.rowCount === 0) {
        res.status(500);
        res.json({ error: 'unexpected error: 500' });
      } else {
        res.json({ pet: databaseResult.rows[0] });
      }
    })
    .catch((err) => {
      res.status(500);
      res.json({ error: 'unexpected error: 500' });
    });
});

petsRouter.post('/', (req, res) => {
  const databaseQuery = `INSERT INTO pets (name, age, type, breed, microchip) VALUES($1, $2, $3, $4, $5) RETURNING *`;
  const { name, age, type, breed, microchip } = req.body;
  const queryValues = [name, age, type, breed, microchip];

  db.query(databaseQuery, queryValues)
    .then((dbResult) => {
      res.json({ pet: dbResult.rows[0] });
    })
    .catch((err) => {
      res.status(404);
      res.json({ error: 'unexpected error: 404' });
    });
});

// PUT /pets/:id
petsRouter.put('/:id', (req, res) => {
  const id = parseInt(request.params.id);
  const { name, age, type, breed, microchip } = request.body;
  // (name, age, type, breed, microchip)
  const updatePetsQuery = ` 
  UPDATE pets
  SET   name = $1,
        age = $2,
        type = $3,
        breed = $4,
        microchip = $5,
  WHERE id = $6`;
  [name, age, type, breed, microchip, pages, id],
    db
      .query(updatePetsQuery)
      .then((databaseResult) => {
        console.log(databaseResult);
        res.json({ pet: databaseResult.rows[0] });
      })
      .catch((error) => {
        console.log(error);
        response.status(200).send(`User modified with ID: ${id}`);
        res.json({ error: 'unexpected error: 500' });
      });
});

// DELETE /pets/:id
petsRouter.delete('/:id', (req, res) => {
  const deleteSinglePetQuery = 'DELETE FROM pets WHERE id = $1';
  const paramValues = [req.params.id];
  db.query(deleteSinglePetQuery, paramValues)
    .then((databaseResult) => {
      if (databaseResult.rowCount === 0) {
        res.status(404);
        res.json({ error: 'pet does not exist' });
      } else {
        res.json({ pet: databaseResult.rows[0] });
      }
    })
    .catch((error) => {
      response.status(200).send(`User deleted with ID: ${id}`);
      res.json({ error: 'unexpected Error' });
      console.log(error);
    });
});

module.exports = petsRouter;
