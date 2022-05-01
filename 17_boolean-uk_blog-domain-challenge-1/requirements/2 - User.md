# User

The User model has already been started for you in the `schema.prisma` file, but we should add some more information to it.

## Instructions

1. Make the username field unique with a 10 character limit.
2. Add a unique email field.
3. Add any other fields you identified while completing the ERD.
4. Run `npx prisma generate` in your terminal to recompile the prisma client package.
5. Update the `./prisma/seed.js` file to accommodate the changes you made to the schema.
6. Run `npx prisma migrate dev --create-only --skip-seed --name user` to create a new migration file.
7. Run `npx prisma migrate reset` to apply your schema changes to the database and run your seed code.
8. Go to your database instance in ElephantSQL, open the `Browser` section, click the `Table queries` drop-down, select the model you've been working on and click `Execute` to check that your data is being inserted correctly.
