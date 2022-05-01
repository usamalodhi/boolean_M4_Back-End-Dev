const prisma = require('../utils/prisma');

const getUsers = async(req, res) => {
    //TODO: Return a list of all users and the channels
    //they belong to
    res.json({users: []})
}

module.exports = { getUsers };
