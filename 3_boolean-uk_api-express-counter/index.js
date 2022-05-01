const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());

//routes
app.get('/', (req, res) => {
  res.send('The Counter Exercise');
});

let count = 0;
// - GET `/counter` - Returns the current value of the counter. The counter should start of at 0.
app.get('/counter', (req, res) => {
  res.send(`The current value of count is ${count}`);
});

// - POST `/counter/increment`-  Increments the counter on the server and returns the current value.
app.post('/counter/increment', (req, res) => {
  count++;
  res.send(`The current value of count is ${count}`);
});

// - POST `/counter/decrement`-  Decrements a counter on the server and returns the current value.
app.post('/counter/decrement', (req, res) => {
  count--;
  res.send(`The current value of count is ${count}`);
});

// - POST `/counter/double`-  Double the value of the counter on the server and returns the current value.
app.post('/counter/double', (req, res) => {
  count = count * 2;
  res.send(`The current value of count is ${count}`);
});

// - DELETE `/counter` - Resets the counter to 0 and returns the current value.
app.delete('/counter/', (req, res) => {
  count = 0;
  res.send(`The current value of count is ${count}`);
});

// - PUT `/counter` that can be used to set the counter to a specific value
// (https://expressjs.com/en/api.html#req.query)
app.put('/counter', (req, res) => {
  let value = req.query;
  count = value.value;
  res.json({ counter: count });
});

// ## Extension 2
// Using [route parameters](https://expressjs.com/en/guide/routing.html),  update your API to keep track of multiple counters. Allow the client to specify the counter name as part of the URL. For example, to update and access a counter called "cars", the client could make the following requests:

const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
