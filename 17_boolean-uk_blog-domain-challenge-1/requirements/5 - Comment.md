# Comment

A comment should have, as a minimum, these fields:
- An auto incrementing ID
- A created at date & time, defaulting to the moment the record gets created
- An updated at date & time
- Content with a 250 character limit

## Instructions

1. Create the Comment model and add the minimum fields listed above.
2. Add any other fields you identified while completing the ERD.
3. Add the appropriate relationships to link comments to posts and users.
4. Run `npx prisma generate` in your terminal to recompile the prisma client package.
5. Update the `./prisma/seed.js` file to accommodate the changes you made to the schema.
6. Run `npx prisma migrate dev --create-only --skip-seed --name comment` to create a new migration file.
7. Run `npx prisma migrate reset` to apply your schema changes to the database and run your seed code.
8. Go to your database instance in ElephantSQL, open the `Browser` section, click the `Table queries` drop-down, select the model you've been working on and click `Execute` to check that your data is being inserted correctly.