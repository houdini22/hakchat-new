let http = require('http')
let server = http.createServer()
let socket_io = require('socket.io')

server.listen(3001)

let io = socket_io()

io.attach(server)
io.on('connection', function (socket) {
  console.log('Socket connected: ' + socket.id)
})
