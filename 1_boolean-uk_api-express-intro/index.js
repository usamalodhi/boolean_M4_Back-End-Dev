const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
app.use(morgan('dev'));
app.use(cors());

//routes - ANSWERS
//-----home
app.get('/', (req, res) => {
  console.log('got request!');
  res.send('Hello!');
});

app.get('/', (req, res) => {
  console.log('got request!');
  res.json({ msg: 'hello!' });
});

//-----greeting
// Every time a `/greeting` route is called, increment a counter. Add a new route, GET `/count` that returns the value of the counter.
let count = 0;
//-----count

app.get('/count', (req, res) => {
  res.send(`greetings count is ${count} times`);
});

// A GET `/greeting` route that returns the json object `{greeting: 'good day'}` Y/N:
// Extension
// Use express route parameters to implement a single /greeting route that handles all the GET requests above.
// /
// /greeting
// /greeting/morning
// /greeting/afternoon
// /greetings
// app.get(`/:greeting/:id?`, (req, res) => {
//   res.send('You requested to see greeting with the id of ' + req.params.id);
// });

app.get('/greeting', (req, res) => {
  console.log(req.params);
  count++;
  res.json({ msg: { greeting: 'good day' } });
});

// A DELETE `/greeting/` route that returns `{greeting: 'good bye'}` Y/N:
app.delete('/greeting', (req, res) => {
  count++;
  res.json({ msg: { greeting: 'good bye there' } }); // works on POSTMAN - how to see on Chrome
});

// A GET `/greeting/morning` route that returns `{greeting: 'good morning'}` Y/N:
app.get('/greeting/morning', (req, res) => {
  count++;
  res.json({ msg: { greeting: 'good morning' } });
});

// A GET `/greeting/afternoon` route that returns `{greeting: 'good afternoon'}` Y/N:
app.get('/greeting/afternoon', (req, res) => {
  count++;
  res.json({ msg: { greeting: 'good afternoon' } });
});

//-----bye
// The above `/bye` route
app.get('/bye', (req, res) => {
  res.send({ msg: { greeting: 'good bye' } });
});

app.delete('/bye', (req, res) => {
  res.send({ msg: 'goodbye forever!' });
});

//routes - ANSWERS

app.get('/fruit/:fruitName/:fruitColor', (req, res) => {
  const { fruitName, fruitColor } = req.params;
  res.json({
    fruitName,
    fruitColor,
  });
});

//start server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
