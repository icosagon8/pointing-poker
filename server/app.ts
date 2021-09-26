import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { nanoid } from 'nanoid';
import { addUser, deleteUser, getUser, getUsers, checkRoom } from './users';
import { addVote, deleteVotes, getResult, getVotes } from './votes';

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

  socket.on('message', (text) => {
    const messageId = nanoid();
    const user = getUser(socket.id);
    io.in(user.room).emit('message', {
      text,
      messageId,
      ...user,
    });
  });

  socket.on('disconnect', () => {
    deleteUser(socket.id);
  });

  socket.on('joinRoom', (room) => {
    io.to(socket.id).emit('room', checkRoom(room));
  });

  socket.on('kickMember', (kickedUser, userAgainst) => {
    const { room } = kickedUser;
    addVote(true, room);
    const users = getUsers(room);

    users.forEach((user) => {
      if (user.id !== kickedUser.id && user.id !== socket.id) {
        io.to(user.id).emit('showModal', kickedUser, userAgainst);
      }
    });
  });

  socket.on('vote', (vote, kickedUser) => {
    const { room, id } = kickedUser;
    addVote(vote, room);
    const votes = getVotes(room);
    const users = getUsers(room);

    if (votes.length + 1 === users.length) {
      const result = getResult(votes);

      if (result) {
        deleteUser(id);
        deleteVotes(room);
        io.to(id).emit('logout');
        io.in(room).emit('users', getUsers(room));
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
