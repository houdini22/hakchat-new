const database = require('../database')

const removeSession = (socketID) => {
  database.deleteFrom('sessions', 'id = :id', {
    id: socketID
  })
}

const userLoggedIn = (socketID, userId) => {
  return database.update('sessions', {
    user_id: userId
  }, `id = '${socketID}'`)
}

const getLoggedInUsers = () => {
  const promise = new Promise((resolve) => {
    database.query(
      `SELECT * FROM sessions 
      JOIN users ON sessions.user_id = users.id 
      WHERE sessions.user_id > 0 
      GROUP BY sessions.user_id`
    )
      .then((rows) => {
        const users = []
        rows.forEach((row) => {
          users.push({
            username: row.username
          })
        })
        resolve(users)
      })
  })
  return promise
}

const createSession = (data) => {
  const { id, client_ip } = data
  database.insertInto('sessions', {
    id,
    client_ip,
  })
}

exports.removeSession = removeSession
exports.userLoggedIn = userLoggedIn
exports.getLoggedInUsers = getLoggedInUsers
exports.createSession = createSession
