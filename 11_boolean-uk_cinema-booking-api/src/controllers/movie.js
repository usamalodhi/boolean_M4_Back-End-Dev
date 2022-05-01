const prisma = require('../utils/prisma');

const getAllMovies = async (req, res) => {
  if (!req.query.lessthan && !req.query.greaterthan) {
    console.log('getAllMovies');
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
    });

    res.json({ data: movies });
  } else if (req.query.lessthan) {
    console.log('getAllMovies < RT');
    const LT = parseInt(req.query.lessthan);
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
      where: {
        runtimeMins: {
          lt: LT,
        },
      },
    });
    res.json({ data: movies });
  } else if (req.query.greaterthan !== undefined) {
    console.log('getAllMovies > RT');
    const GT = parseInt(req.query.greaterthan);
    const movies = await prisma.movie.findMany({
      include: {
        screenings: true,
      },
      where: {
        runtimeMins: {
          gt: GT,
        },
      },
    });

    res.json({ data: movies });
  }
  console.log(`getAllMovies : ${movies}`);
};

const createMovie = async (req, res) => {
  const { title, runtimeMins, startsAt, screenId } = req.body;

  const doesMovieExist = async (title) => {
    return await prisma.movie.findFirst({
      where: {
        title: title,
      },
    });
  };

  if (await doesMovieExist(title)) return res.status(400).send('This movie already exists');

  const createdMovie = await prisma.movie.create({
    data: {
      title,
      runtimeMins,
      screenings: {
        create: {
          startsAt,
          screen: {
            connect: {
              id: screenId,
            },
          },
        },
      },
    },
    include: {
      screenings: true,
    },
  });

  res.json({ data: createdMovie });
};

const getSingleMovie = async (req, res) => {
  const movieReq = req.params.movie;
  if (isNaN(movieReq) === true) {
    const movie = await prisma.movie.findFirst({
      where: {
        title: movieReq,
      },
    });
    res.json({ data: movie });
  } else {
    const movieId = parseInt(movieReq);
    const movie = await prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    res.json({ data: movie });
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getSingleMovie,
};
