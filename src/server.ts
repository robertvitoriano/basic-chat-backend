import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(morgan('tiny'));

app.use(cors());

io.on("connect", (socket) => {
  socket.emit("connected", { clientId: socket.id })

  io.emit('clientConnected', { clientId: socket.id })

  socket.on('sendMessage', (data, callback) => {

    const { clientId, message } = data

    io.emit('message', { message, clientId })

    callback('delivered')

    socket.broadcast.emit('userJoined', { message: 'A new user has joined', username: 'user', clientId })
  })

  socket.on('sendLocation', ({ latitude, logintude }) => {
    socket.broadcast.emit('userLocation', { clientId: socket.id, location: { latitude, logintude } })
  })


  socket.on("disconnect", (socket) => {
    io.emit('userLeft', { message: 'A new user has joined', username: 'user', clientId: socket.id });
  })

});


server.listen(4000, () => {
  console.log('My server is up and running');
})