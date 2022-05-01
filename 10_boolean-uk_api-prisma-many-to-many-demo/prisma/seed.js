const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {

    //TODO:
    // Add the following users:
    // - Alice
    // - Bob
    // - Fred

    // Add the following channels with the members:
    // - classroom: everyone
    // - off-topic: bob and alice only
    process.exit(0);
}

console.log("Running seed file")
seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));