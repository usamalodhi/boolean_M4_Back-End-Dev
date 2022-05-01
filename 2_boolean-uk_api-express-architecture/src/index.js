const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");

//Configure express
const app = express();
app.use(morgan("dev"));
app.use(bodyParser.json());

//Add application routes
const usersRouter = require('./routers/users.router')
app.use("/users", usersRouter)

//Start up the server
const db = require("./database/connection");
const port = 3030;
app.listen(port, () => {
  db.connect((error) => {
    if (error) {
      console.error("Database Connection error: ", error.stack);
      process.exit(1)
    } else {
      console.log("Database Connected");
    }
  });

  console.log(`Server Running on http://localhost:${port}/`);
});
