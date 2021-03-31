var io = require('socket.io')(http)
var app = require('express')
var http = require('http').createServer(app)

app.get('/',(req,res) => res.send('hello!'));

io.on('connection',(socket) => {
    console.log('a user connected')
    socket.on('message',(msg) => {
        console.log(msg);
        socket.broadcast.emit('message-broadcast', msg)
    })
})

http.listen(3300,() => {
    console.log('listening to 3300')
})