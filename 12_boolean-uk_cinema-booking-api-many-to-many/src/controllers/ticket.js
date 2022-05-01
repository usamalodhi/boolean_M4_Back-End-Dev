const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTicket = async (req, res) => {
  const { customerId, screeningId, seatsIds } = req.body;

  console.log(`seatsIds`, seatsIds);

  const seatsIdsConnect = [];

  for (let i = 0; i < seatsIds.length; i++) {
    const connectedSeat = {
      seat: {
        connect: {
          id: seatsIds[i],
        },
      },
    };

    seatsIdsConnect.push(connectedSeat);
    console.log('Connected seat:', connectedSeat);
  }

  console.log(`seatsIdsConnect`, seatsIdsConnect);

  const createdTicket = await prisma.ticket.create({
    data: {
      customer: {
        connect: {
          id: customerId,
        },
      },
      screening: {
        connect: {
          id: screeningId,
        },
      },
      seats: {
        create: seatsIdsConnect,
      },
    },
    include: {
      customer: true,
      screening: true,
      seats: true,
    },
  });

  console.log('Created ticket:', createdTicket);
  res.json({ data: createdTicket });
};

module.exports = {
  createTicket,
};
