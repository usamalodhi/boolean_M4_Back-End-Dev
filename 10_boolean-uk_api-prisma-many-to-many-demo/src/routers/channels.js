const express = require("express");
const controller = require('../controllers/channels');
const router = express.Router();

router.get("/", controller.getChannels);

module.exports = router;
