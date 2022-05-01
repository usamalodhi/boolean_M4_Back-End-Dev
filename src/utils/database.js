//Load our .env file
require('dotenv').config();

//Require the postgres library
const { Client } = require('pg');

//Get the connection string from process.env -
const connection = process.env.PGURL;

//Create a new connection to the database. Client
const db = new Client(connection);
module.exports = db;
