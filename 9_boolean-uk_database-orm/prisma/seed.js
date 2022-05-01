const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
  const createdCustomer = await prisma.customer.create({
    data: {
      name: 'Alice',
      contact: {
        create: {
          phone: '23489239487',
          email: 'ALiceinWonderLand@gmail.com',
        },
      },
    },
  });

  console.log('Customer created', createdCustomer);

  // Add your code here
  const createdContact = await prisma.contact.create({
    data: {
      phone: '+0991235024',
      email: 'RedQueen@mail.com',
      customer: {
        create: {
          name: 'Red Queen',
        },
      },
    },
  });

  console.log('Contact created', createdContact);

  const createdMovie = await prisma.movie.create({
    data: {
      title: 'The Batman',
      runtimeMins: 180,
    },
  });

  console.log('Movie created', createdMovie);

  const createdScreen = await prisma.screen.create({
    data: {
      number: 1,
    },
  });

  console.log('Screen created', createdScreen);

  const createdScreening = await prisma.screening.create({
    data: {
      startsAt: new Date('2022-03-30T15:22'),
      movie: {
        connect: {
          id: createdMovie.id,
        },
      },
      screen: {
        connect: {
          id: createdScreen.id,
        },
      },
    },
  });

  console.log('Screening created', createdScreening);

  const createdTicket = await prisma.ticket.create({
    data: {
      customer: {
        create: {
          name: 'Mad Hatter',
          contact: {
            create: {
              phone: '23942394239234',
              email: 'MadHatterTeaParties@gmail.com',
            },
          },
        },
      },
      screening: {
        create: {
          startsAt: new Date('2022-02-02T15:45'),
          movie: {
            connect: {
              id: createdMovie.id,
            },
          },
          screen: {
            connect: {
              id: createdScreen.id,
            },
          },
        },
      },
    },
  });

  console.log('Ticket created', createdTicket);

  // Don't edit any of the code below this line
  process.exit(0);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
