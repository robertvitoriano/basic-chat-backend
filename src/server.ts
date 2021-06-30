import http from'http';
import express  from 'express';
import  socketio from 'socket.io';
import cors from 'cors';
import morgan from 'morgan';


const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(morgan('tiny'));

app.use(cors());

io.on("connect", (socket) => {
  socket.emit("connected",{clientId:socket.id})

  io.emit('clientConnected', {clientId:socket.id})

  socket.on('sendMessage', (data)=>{

    const { clientId, message } = data

    io.emit('messageSent',{message, clientId})


  })



  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



server.listen(4000,()=>{
  console.log('My server is up and running');
})