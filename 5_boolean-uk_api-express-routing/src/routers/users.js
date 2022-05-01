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

module.exports = router;
