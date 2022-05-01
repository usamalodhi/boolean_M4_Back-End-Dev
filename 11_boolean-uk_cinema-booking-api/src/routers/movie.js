const express = require('express');
const { getAllMovies, createMovie, getSingleMovie } = require('../controllers/movie');

const router = express.Router();

//localhost:4000/movies/
http: router.get('/', getAllMovies);
//localhost:4000/movies/Dodgeball
http: router.get('/:movie', getSingleMovie);

router.post('/', createMovie);

module.exports = router;
