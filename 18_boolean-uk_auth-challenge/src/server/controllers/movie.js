const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// get all movies===========================
const getAllMovies = async (req, res) => {
  const movies = await prisma.movie.findMany();
  res.json({ data: movies });
};

// create movie=============================
const createMovie = async (req, res) => {
  const { title, description, runtimeMins } = req.body;
  const { authorization } = req.headers;

  try {
    const token = authorization;
    jwt.verify(token, jwtSecret);
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token provided.' });
  }

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      description,
      runtimeMins,
    },
  });

  res.json(createdMovie);
};

module.exports = {
  getAllMovies,
  createMovie,
};
