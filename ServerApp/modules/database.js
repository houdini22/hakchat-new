const Client = require('mariasql')
const config = require('../config')

const client = new Client({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  db: config.database.database
})

// proxy
const query = (statement, params = {}) => {
  const promise = new Promise((resolve, reject) => {
    client.query(statement, params, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
  return promise
}

// proxy
const insertInto = (tableName, params) => {
  let statement = `INSERT INTO ${tableName} SET `
  let statementParameters = []
  Object.keys(params).forEach((key) => {
    statementParameters.push(`${key} = :${key}`)
  })
  statement = statement + statementParameters.join(', ')
  return query(statement, params)
}

// proxy
const deleteFrom = (tableName, where, params) => {
  const statement = `DELETE FROM ${tableName} WHERE ${where}`
  return query(statement, params)
}

// proxy
const select = (tableName, where, params = {}) => {
  const statement = `SELECT * FROM ${tableName} WHERE ${where}`
  return query(statement, params)
}

// proxy
const update = (tableName, params, where) => {
  const statementParameters = []
  Object.keys(params).forEach((key) => {
    statementParameters.push(`${key} = :${key}`)
  })
  const statement = `UPDATE ${tableName} SET ${statementParameters.join(', ')} WHERE ${where}`
  return query(statement, params)
}

exports.query = query
exports.insertInto = insertInto
exports.deleteFrom = deleteFrom
exports.select = select
exports.update = update
