# JSON Web Tokens

## Learning Objectives

- Explain the Bearer Authentication flow
- Use a third-party library to create, expire and verify JSON Web Tokens

## Introduction

There are various types of authentication systems; we'll be focusing on a common one referred to as *Bearer Authentication*. The core of the process works like this:
1. A user enters their login details into a form
2. The client sends the credentials to a server in the body of a request to an API
3. The server checks the credentials are correct
4. The server creates an access token for the user and sends it back to the client
5. The client saves the token and sends it in a request header when the user tries to access protected areas of the app

We can visualise the process like this:

![](./assets/Auth_Flow.png)

<details>
<summary><strong>Okay, but what's a token?</strong> <em>(click to expand)</em></summary>
<br>
<blockquote>Think of a token like an employee ID badge; you can't enter the secure areas of your employer's building without one! The company verify that you are who you say you are when they hire you, and then they give you an ID badge so you can access employee-only rooms in the building.</blockquote>
<br>
In this analogy, verifying you are who you say you are symbolises entering a username and password into a login form. The ID badge granted to you is the token; only you have this token, and you show it to the server every time you want to make a request to a protected resource.
<br><br>
One of the most common types of tokens are called <em>JSON Web Token's</em>, a.k.a JWT's.
<br><br>
A JWT is comprised of 2 separate pieces of JSON and a signature hash, each of them encoded and placed into a string separated by dots.
<br><br>
The final token will have a structure that looks like <code>xxxxx.yyyyy.zzzzz</code>
<br><br>
The three pieces are:<br>
<ol>
<li>Header (<code>xxxxx</code>)</li>
<li>Payload (<code>yyyyy</code>)</li>
<li>Signature (<code>zzzzz</code>)</li>
</ol>

<h2>Header</h2>

The header usually contains two properties: the type of token (JWT) and the signing algorithm to use. For example:
<pre>
{
    "alg": "HS256",
    "typ": "JWT"
}
</pre>

That is then Base64 encoded into a string (<code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9</code>) and forms the first part of the token.
<br><br>
<h2>Payload</h2>

The payload usually contains information about an entity that is required for the app to function; for example, user identification data. Do not store sensitive information, such as passwords, in tokens.
<pre>
{
    "id": 13,
    "username": "nathank"
}
</pre>

That is then Base64 encoded into a string (<code>eyJpZCI6MTMsInVzZXJuYW1lIjoibmF0aGFuayJ9</code>) and forms the second part of the token.
<br><br>
<h2>Signature</h2>

The signature is the result of a hashing function that takes in 2 parameters: the encoded header and payload separated by a dot, and a "secret phrase" - the secret is just a string of text that only the server knows, kind of like a password.
<br><br>
A signature might look something like this: <code>TSh7SwNomgPOcdK9CLIhWT2m_UVay_RzNLrsu9gCwl0</code>
<br><br>
So the end result, our JSON Web Token containing all three parts, looks like this: <code>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsInVzZXJuYW1lIjoibmF0aGFuayJ9.TSh7SwNomgPOcdK9CLIhWT2m_UVay_RzNLrsu9gCwl0</code>

Notice the dots separating each section! <code>Header.Payload.Signature</code>

<h2>Breathe!</h2>
You don't need to concern yourself too deeply with the methods for creating a JWT or hashing a signature, there are vetted libraries to take care of this process for us.
<br><br>
The key things to remember are:
<ul>
<li>You create a token using a JSON object containing useful (but not sensitive) data, such as a user's ID and username. This allows the server to remember who the token was made for so the user doesn't have to login again.</li>
<li>Your server uses a string that only it knows the value of to sign and verify the token. This allows the server to confirm that the token originated from itself and can be trusted when the client sends it back in future requests.</li>
</ul>
</details>

## Instructions

1. Fork this repository and clone the fork to your machine.
2. Run `npm ci` to install project dependencies.
3. Implement each of the empty functions inside `src/token.js`.
    - There are links to the relevant sections of documentation in the function comments, try to examine the example code if the descriptions are too difficult to grasp.
4. Run `npx jasmine` to test your code. Feel free to look at the test suite inside `spec/token.spec.js`, but don't change anything in there.
5. Answer the questions in the `questions/` directory

## Notes

The documentation is quite difficult to read, especially as a beginner. Throw away any expectations of understanding how the token is generated or what hashing algorithms do; the purpose of this exercise is to understand how to use the `jsonwebtoken` library to create, verify and expire tokens.

Nobody will expect a junior developer to build an authentication system, all you need to know is how to work with one that already exists.

[You can practice creating JWT's and read more about them here.](https://jwt.io/)
