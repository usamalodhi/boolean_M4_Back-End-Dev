const express = require('express');
const router = express.Router();
const { films } = require('../../data.js');
let filmId = films.length;

// GET / films + EXT -  GET / films / director; localhost:3030/films?director=
router.get('/', (req, res) => {
  const director = req.query.director;
  if (director) {
    res.json(films.filter((film) => film.director === director));
  } else {
    res.json({ films });
  }
});

// GET /films/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const film = films.find((film) => film.id === id);

  res.json({ film });
});

// POST /films
router.post('/', (req, res) => {
  filmId++;

  const film = {
    ...req.body,
    id: filmId,
  };

  films.push(film);

  res.json({ film: film });
});

router.patch('/:id', (req, res) => {
  const userID = parseInt(req.params.id);
  const isMovie = data.films.find((film) => film.id === userID);

  if (!isMovie) {
    res.status(404);
    res.json({ error: 'There is no movie matching this ID' });
    return;
  }
  if (!req.body.title && !req.body.director) {
    res.status(400);
    res.json({ error: 'We could not find the movie you were looking for' });
  }

  for (const body in req.body) {
    isMovie[body] = req.body[body];
  }

  res.json({ film: isMovie });
});

module.exports = router;
