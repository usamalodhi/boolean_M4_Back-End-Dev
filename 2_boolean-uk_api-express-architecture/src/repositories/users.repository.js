const db = require('../database/connection')

const getAllUsers = () => {
  const getAllUsersSql = `SELECT * FROM users`

  return db.query(getAllUsersSql)
    .then(result => result.rows)
    .catch(error => {
      console.error(error)
      throw new Error('Database Error')
    })
}

const addUser = (user) => {
  const insertUserSql = `
    INSERT INTO users(name, email)
    VALUES ($1,$2)
    RETURNING *`

  const params = [
    user.name,
    user.email
  ]

  return db.query(insertUserSql, params)
    .then(result => result.rows[0])
    .catch(error => {
      console.error(error)
      throw new Error('Database Error')
    })
}


module.exports = {
  getAllUsers,
  addUser
}