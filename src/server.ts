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

  socket.on('join', ({ username, room }, callback) => {

    try {

      const user = Users.addUser({ username, room, id: socket.id })

      socket.join(user.room)
      socket.emit('message', Messages.generateMessage('Welcome'))
      socket.broadcast.to(user.room).emit('message', Messages.generateMessage(`${user.username} has joined !`))

      callback('Joined successfully !')

    } catch (e) {

      console.error(e)

      callback(e)

    }

  })

  socket.on('sendMessage', (data, callback) => {

    const { message } = data

    const user = Users.getUser({ id: socket.id })

    io.to(user.room).emit('message', Messages.generateMessage(message))

    callback('delivered')

  })

  socket.on('sendLocation', ({ latitude, logintude }) => {

    const user = Users.getUser({ id: socket.id })

    io.to(user.room).emit('userLocation', {
      clientId: socket.id,
      location: { latitude, logintude }
    })

  })

  socket.on("disconnect", () => {
    const user = Users.removeUser({ id: socket.id })

    if (user) {

      io.to(user.room).emit('userLeft', Messages.generateMessage(`${user.username} has left ! `));

    }

  })

});


server.listen(4000, () => {
  console.log('My server is up and running');
})