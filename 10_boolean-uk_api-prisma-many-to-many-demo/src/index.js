require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const channelsRouter = require('./routers/channels');
const usersRouter = require('./routers/users');

app.use('/channels', channelsRouter);
app.use('/users', usersRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`\n Server is running on http://localhost:${port}\n`);
});
