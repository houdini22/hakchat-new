const http = require('http')
const server = http.createServer()
const socketIO = require('socket.io')
const io = socketIO()
const moment = require('moment')

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
    let found = false

    data.users.forEach((user) => {
      if (user.username === username && password === user.password) {
        sessions[socket.id].user = {
          username
        }
        socket.emit('logged in', {
          username,
          token: socket.id
        })
        found = true
        return false
      }
    })

    if (!found) {
      socket.emit('login failed')
    }

    if (found) {
      socket.join('main', () => {
        io.to('main').emit('user joined', {
          user: {
            username
          },
          time: new Date()
        })
      })

      let timeout = null

      socket.on('user starts writing', (data) => {
        io.to('main').emit('user starts writing', {
          user: {
            username: data.user.username,
          }
        })
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          io.to('main').emit('user stops writing', {
            user: {
              username: data.user.username,
            }
          })
        }, 2000)
      })
      socket.on('user stops writing', (data) => {
        clearTimeout(timeout)
        io.to('main').emit('user stops writing', {
          user: {
            username: data.user.username,
          }
        })
      })
    }
  })

  // save session
  sessions[socket.id] = {
    id: socket.id,
    ip: socket.request.connection.remoteAddress,
    user: null
  }
})

io.attach(server)
