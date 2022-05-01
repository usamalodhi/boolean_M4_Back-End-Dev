const express = require('express');

const { getSeatByScreenId } = require('../controllers/seat');

const router = express.Router();

router.get('/', getSeatByScreenId);

module.exports = router;
