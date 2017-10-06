const database = require('../database')

const loginAttempt = (username, password) => {
  const promise = new Promise((resolve, reject) => {
    database.select('users', 'username = :username AND password = :password', {
      username,
      password
    }).then((result) => {
      if (result.info.numRows > 0) {
        resolve(result[0])
      } else {
        reject(new Error('Wrong credentials.'))
      }
    })
  })
  return promise
}

exports.loginAttempt = loginAttempt
