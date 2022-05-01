# Prisma many to many demo

## Set up
Note: Although we need to create a new primary database, we can reuse a shadow database across multiple projects since Prisma resets it after using it.

* Create a new database instance in ElephantSQL.
* Rename the .env.example file to .env
* Edit the DATABASE_URL variable in .env, swapping YOUR_DATABASE_URL for the URL of the database you just created. Leave ?schema=prisma at the end.
* Edit the SHADOW_DATABASE_URL variable in .env, swapping YOUR_SHADOW_DATABASE_URL for the URL of the shadow database you created in the earlier exercises. Leave ?schema=shadow at the end.
* Run npm ci to install the project dependencies.
* Run npx prisma migrate reset to execute the existing migrations & data seed. Press y when it asks if you're sure.

## Instructions
Your instructor will demo:
* Implementing a many to many relationship between Users and Channels
* Updating the seed file to add and connect some users and channels
* Returning the related data from the `GET /channels` and `GET /users endpoints`.

## References
* [Prisma Many to Many](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/many-to-many-relations#relational-databases)
