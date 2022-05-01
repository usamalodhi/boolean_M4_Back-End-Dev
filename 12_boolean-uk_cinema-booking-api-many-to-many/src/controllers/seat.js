const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getSeatByScreenId = async (req, res) => {
  console.log(req.query.screenId);

  const seat = await prisma.seat.findMany({
    where: {
      screenId: parseInt(req.query.screenId),
    },
    include: {
      screen: true,
      tickets: true,
    },
  });

  console.log('Seat:', seat);
  res.json({ data: seat });
};

module.exports = {
  getSeatByScreenId,
};
