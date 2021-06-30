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
  console.log("New client connected ",socket.id)

  io.emit('clientConnected', {id:socket.id})

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});



server.listen(4000,()=>{
  console.log('My server is up and running');
})