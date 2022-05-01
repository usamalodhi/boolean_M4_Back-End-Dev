const express = require('express');
const router = express.Router();
const { users } = require('../../data.js');
let userId = users.length;

// GET /users
router.get('/', (req, res) => {
  res.json({ users });
});

// GET /users/:id
router.get('/:id', (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  res.json({ user });
});

// POST /users
router.post('/', (req, res) => {
  userId++;

  const user = {
    ...req.body,
    id: userId,
  };

  users.push(user);

  res.json({ user: user });
});

//DELETE /users
router.delete('/:id', (req, res) => {
  const userID = parseInt(req.params.id);
  const deleteUser = data.users.find((user) => user.id === userID);
  if (!deleteUser) {
    res.status(404);
    res.json({ error: 'There is no matching user with this ID to delete' });
    return;
  }
  data.users = data.users.filter((user) => user !== deleteUser);

  res.json({ delete: deleteUser });
});

//PUT is used to UPDATE a record
router.put('/:id', (req, res) => {
  const userID = parseInt(req.params.id);
  const existingUser = data.users.find((user) => user.id === userID);
  if (!existingUser) {
    res.status(404);
    res.json({ error: 'There is no matching user with this ID to update' });
    return;
  }
  if (!req.body.email) {
    res.status(400);
    res.json({ error: 'email not specified' });
  }
  existingUser.email = req.body.email;
  res.json({ user: existingUser });
});

module.exports = router;
