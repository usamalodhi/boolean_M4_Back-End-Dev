# Express Intro

## Learning Objectives

- Explain how to set up and run an Express application
- Build a simple Express API and send a HTTP request to an available endpoint using a HTTP client
- Explain that JSON is a widely-used language-agnostic format for encoding data as attribute value pairs
- Diagram the request and response cycle for an Express API.
- Use console.log() and read the result in the server logs

## Express

Express is a library that makes it easier for us to write an API server using node.js. In this workshop, you will learn how to set up express and write a simple API with multiple routes.

## Express Setup

To set up a new express application, in an empty folder follow these steps.

1. Initialize npm. You can accept all the defaults.

```
npm init
```

2. Install the [express](https://expressjs.com/) library

```
npm install express
```

3. Install [nodemon](https://www.npmjs.com/package/nodemon). nodemon is a utility that will automatically restart our express server any time we change code.

```
npm install --save-dev nodemon
```

4. Install the [morgan](https://expressjs.com/en/resources/middleware/morgan.html) middleware. Express middleware allows us to extend express with additional functionality. Morgan is express middleware we can use to have our server automatically log all requests. This helps gives us visibility of what our server is doing.

```
npm install morgan
```

5. Install the [cors](https://expressjs.com/en/resources/middleware/cors.html) middleware. This allows us to make HTTP requests to our API using fetch from the browser.

```
npm install cors
```

6. Create our `index.js` file. This is our _entrypoint_ - the source file that will start running our server.

```javascript
//Include the express library
const express = require('express');
//Include the morgan middleware
const morgan = require('morgan');
//Include the cors middleware
const cors = require('cors');

//Create a new express application
const app = express();

//Tell express we want to use the morgan library
app.use(morgan('dev'));
//Tell express we want to use the cors library
app.use(cors());

//Start up our server
const port = 3030;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});
```

7. Update your `package.json` file and replace the `"scripts"` section with the following:

```json
"scripts": {
   "start" : "nodemon index.js"
},
```

8. Finally, start up our server!

```
npm start
```

Our servers is now running and _listening_ for HTTP requests.

## Adding Routes

If you try to access your server using your browser or any other tool, you will get the response:

```
Cannot GET /
```

This is because we've not yet told express what _routes_ our API should handle.

Express provides us with the ability to easily set up [routes](https://expressjs.com/en/guide/routing.html) in our API. The following will return "Hello!" to any HTTP request set to the default "/" route:

```javascript
app.get('/', (req, res) => {
  console.log('got request!');
  res.send('Hello!');
});
```

Note: this needs to be added before we start the server.

The code above:

1. Tells express we want to define a handler for any GET request (`app.get`) to the path `/`
2. Provides a callback function to express using the arrow function syntax. Here we are telling express "When you receive a HTTP request on this path, I want you to call this function".
3. The callback function accepts 2 arguments, `req` and `res`. These are objects provided to use by express. `req` contains information about the HTTP [request](https://expressjs.com/en/4x/api.html#req) from the client. `res` allows us to send back different [responses](https://expressjs.com/en/4x/api.html#res) to the client.
4. Our callback uses the response object to send back some text to the client.

We can also send back `json` using the `res.json()` method that express gives us:

```javascript
app.get('/', (req, res) => {
  console.log('got request!');
  res.json({ msg: 'hello!' });
});
```

// The res object basically refers to the response that'll be sent out as part of this API call.

// The res.send function sets the content type to text/Html which means that the client will now treat it as text. It then returns the response to the client.

// The res.json function on the other handsets the content-type header to application/JSON so that the client treats the response string as a valid JSON object. It also then returns the response to the client.

## Exercise Part 1

1. Set up and install express using the steps above.
2. Implement the Hello! API endpoint from above.
3. Make a request to the endpoint using `curl`, your browser, a `fetch` request from the Developer Console, and an API testing tool such as Insomnia or Postman.
4. Look at the express documentation for the [request](https://expressjs.com/en/4x/api.html#req) object. Update the handler to log out the following information from the request object: baseUrl, ip, protocol, method. What other information might be useful from the request object in a real API?

## Adding Routes

We can add as many routes as we like with express. To add another route that returns `{ msg: 'Goodbye'}`:

```javascript
app.get('/bye', (req, res) => {
  res.send({ msg: 'goodbye!' });
});
```

To add handlers for different http methods, we can use `app.delete`, `app.post`, `app.put` and `app.patch`. For example, to add a handler for a DELETE request:

```javascript
app.delete('/bye', (req, res) => {
  res.send({ msg: 'goodbye forever!' });
});
```

## Exercise Part 2

Implement the following express routes in your application:

- The above `/bye` route
- A GET `/greeting` route that returns the json object `{greeting: 'good day'}`
- A GET `/greeting/morning` route that returns `{greeting: 'good morning'}`
- A GET `/greeting/afternoon` route that returns `{greeting: 'good afternoon'}`
- A DELETE `/greeting/` route that returns `{greeting: 'good bye'}`

Every time a `/greeting` route is called, increment a counter. Add a new route, GET `/count` that returns the value of the counter.

## Extension

Use express route parameters to implement a single /greeting route that handles all the GET requests above.
