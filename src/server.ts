import http from 'http';
import express from 'express';
import socketio from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';
const app = express();
const server = http.createServer(app);
const io = socketio(server);
import Messages from './utils/Messages'
import Users from './utils/users'

app.use(morgan('tiny'));

app.use(cors());

io.on("connect", (socket) => {

  socket.emit("connected", { clientId: socket.id })

  socket.on('join', ({ username, room }) => {

    try{

      Users.addUser({ username, room, id: socket.id })

    }catch(e){

      console.error(e)

    }

    socket.join(room)

    socket.emit('message', Messages.generateMessage('Welcome'))

    socket.broadcast.to(room).emit('message', Messages.generateMessage(`${username} has joined !`))

  })

  socket.on('sendMessage', (data, callback) => {

    const { clientId, message, username } = data

    const user = Users.getUser({ id: socket.id })

    io.to(user.room).emit('message', Messages.generateMessage(message))

    callback('delivered')

  })

  socket.on('sendLocation', ({ latitude, logintude}) => {
    const user = Users.getUser({ id: socket.id })

    io.to(user.room).emit('userLocation', {
      clientId: socket.id,
      location: { latitude, logintude }
    })

  })

  socket.on("disconnect", () => {
    const user = Users.getUser({ id: socket.id })

    io.to(user.room).emit('userLeft', {
      message: 'A new user has joined',
      username: 'user',
      clientId: socket.id
    });

    Users.removeUser({id:socket.id})

  })

});


server.listen(4000, () => {
  console.log('My server is up and running');
})