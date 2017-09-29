const http = require('http')
const server = http.createServer()
const socketIO = require('socket.io')
const io = socketIO()

const data = require('./data')

server.listen(3001)

let sessions = {}

io.on('connection', (socket) => {
  // on DISCONNECT
  socket.on('disconnect', () => {
    // remove session
    sessions = Object.keys(sessions)
      .filter((socketId) => {
        return socketId !== socket.id
      })
      .reduce((obj, key) => {
        obj[key] = sessions[key]
        return obj
      }, {})
  })

  // on LOGIN
  socket.on('login', (payload) => {
    const { username, password } = payload

    data.users.forEach((user) => {
      if (user.username === username && password === user.password) {
        sessions[socket.id].user = {
          username
        }
        socket.emit('logged in', {
          username,
          token: socket.id
        })
      }
    })
  })

  // save session
  sessions[socket.id] = {
    id: socket.id,
    ip: socket.request.connection.remoteAddress,
    user: null
  }
})

io.attach(server)
