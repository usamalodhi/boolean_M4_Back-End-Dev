const prisma = require('../utils/prisma');

const getChannels = async(req, res) => {
    //TODO: Return a list of all channels and the users
    //in that channel
    res.json({channels: []})
}

module.exports = { getChannels };
