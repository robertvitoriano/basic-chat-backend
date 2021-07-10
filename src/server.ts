import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
const server = http.createServer(app);
const io = socketio(server);
import Messages from './utils/Messages'

app.use(morgan('tiny'));

app.use(cors());

io.on("connect", (socket) => {

  socket.broadcast.emit('userJoined', {
    message: 'A new user has joined',
    username: 'user',
    clientId: socket.id,
    timestamp: new Date().getTime()
  })

  socket.emit("connected", { clientId: socket.id })

  io.emit('clientConnected', { clientId: socket.id })

  socket.on('sendMessage', (data, callback) => {

    const { clientId, message, username } = data

    io.emit('message', Messages.generateMessage(message))

    callback('delivered')

  })

  socket.on('sendLocation', ({ latitude, logintude }) => {
    socket.broadcast.emit('userLocation', {
      clientId: socket.id,
      location: { latitude, logintude }
    })
  })


  socket.on("disconnect", (socket) => {
    io.emit('userLeft', {
      message: 'A new user has joined',
      username: 'user',
      clientId: socket.id
    });
  })

});


server.listen(4000, () => {
  console.log('My server is up and running');
})