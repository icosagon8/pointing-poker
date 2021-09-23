import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { nanoid } from 'nanoid';
import { addUser, deleteUser, getUser, getUsers, checkRoom } from './users';

const PORT = process.env.PORT || 8080;
const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket: Socket) => {
  socket.on('login', ({ firstname, lastname, position, role, avatar, room }, callback) => {
    const user = addUser({ id: socket.id, firstname, lastname, position, role, avatar, room });
    socket.join(user.room);
    io.in(room).emit('users', getUsers(room));
    callback();
  });

  socket.on('startGame', (room) => {
    io.in(room).emit('redirectToNewGame');
  });

  socket.on('message', (text) => {
    const messageId = nanoid();
    const user = getUser(socket.id);
    io.in(user.room).emit('message', {
      text,
      messageId,
      userId: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      position: user.position,
      avatar: user.avatar,
    });
  });

  socket.on('disconnect', () => {
    deleteUser(socket.id);
  });

  socket.on('joinRoom', (room) => {
    io.to(socket.id).emit('room', checkRoom(room));
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
