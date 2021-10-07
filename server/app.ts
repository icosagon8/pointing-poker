import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import { nanoid } from 'nanoid';
import { addUser, deleteUser, getUser, getUsers, checkRoom, deleteUsersInRoom, getScramMasterInRoom } from './users';
import {
  addStatus,
  waitingGame,
  gameInProgress,
  endGame,
  checkStatusGame,
  deleteStatusGameInRoom,
  roundInProgress,
  getStatusGame,
} from './statusGame';
import {
  addIssue,
  editIssue,
  getIssues,
  deleteIssue,
  setCurrentIssueClick,
  nextIssue,
  deleteIssuesInRoom,
  setScoreIssue,
} from './issues';
import { sendSettings, getSettings, getSettingsAdmitUser } from './settings';
import { addVote, deleteVotes, getResult, getVotes } from './votes';
import { addTitle, checkTitle, editTitle, getTitle } from './title';
import { addGameVote, getGameVotes } from './gameVote';
import { getStat, deleteStat } from './statistic';

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
  socket.on('login', ({ firstname, lastname, position, role, avatar, room, statusGame }, callback) => {
    const user = addUser({ id: socket.id, firstname, lastname, position, role, avatar, room });
    socket.join(user.room);
    io.to(socket.id).emit('title', getTitle(room));
    io.to(socket.id).emit('issues', getIssues(room));
    io.to(socket.id).emit('sendSettings', getSettings(room));
    if (checkStatusGame(room) === 'waiting-game' || role === 'scram-master') {
      addStatus({ statusGame, room });
      waitingGame(room);
      io.in(room).emit('users', getUsers(room));
      callback();
    } else if (getSettingsAdmitUser(room)) {
      io.to(user.id).emit('redirectToGame');
      io.in(room).emit('users', getUsers(room));
    } else {
      io.to(getScramMasterInRoom(room).id).emit('loginRequest', user.id, firstname, lastname, room);
      io.to(user.id).emit('waitingEnterGame');
    }
  });

  socket.on('receiveUser', ({ id, room }, answer) => {
    if (answer) {
      io.to(getUser(id).id).emit('redirectToGame', getUsers(room));
      io.in(room).emit('users', getUsers(room));
    } else {
      io.to(getUser(id).id).emit('rejectEnterToGame');
      deleteUser(id);
    }
  });

  socket.on('waitingEnterGameCancel', (room) => {
    io.to(getScramMasterInRoom(room).id).emit('loginRequestCancel');
    deleteUser(socket.id);
  });

  socket.on('statusGame-progress', (room) => {
    gameInProgress(room);
  });

  socket.on('statusGame-round', (room) => {
    roundInProgress(room);
  });

  socket.on('statusGame-end', (room) => {
    endGame(room);
    io.in(room).emit('getStatusGame', getStatusGame(room));
  });

  socket.on('startGame', (room) => {
    io.in(room).emit('redirectToNewGame');
  });

  socket.on('cancelGame', (room) => {
    io.in(room).emit('logout');
    deleteUsersInRoom(room);
    deleteIssuesInRoom(room);
    deleteStatusGameInRoom(room);
  });

  socket.on('exitUser', (room) => {
    deleteUser(socket.id);
    io.to(socket.id).emit('logout');
    io.in(room).emit('users', getUsers(room));
  });

  socket.on('message', (text) => {
    const messageId = nanoid();
    const user = getUser(socket.id);
    io.in(user?.room).emit('message', {
      text,
      messageId,
      ...user,
      type: 'regular',
    });
  });

  socket.on('sendGameVote', (vote) => {
    if (addGameVote(vote)) {
      io.in(vote.roomId).emit('getGameVote', getGameVotes(vote.roomId));
      io.in(vote.roomId).emit('getStatistic', getStat(vote.roomId));
    }
  });

  socket?.on('stopTimer', (room) => {
    io.in(room).emit('stopTimerUsers');
  });

  socket.on('saveSettings', (settings) => {
    sendSettings(settings);
    io.in(settings.roomId).emit('sendSettings', settings);
  });

  socket.on('saveIssue', (issue) => {
    addIssue(issue);
    io.in(issue.roomId).emit('issues', getIssues(issue.roomId));
  });

  socket.on('editIssue', (issue, id) => {
    editIssue(issue, id);
    io.in(issue.roomId).emit('issues', getIssues(issue.roomId));
  });

  socket.on('deleteIssue', (id, room) => {
    deleteIssue(id, room);
    deleteStat(id);
    io.in(room).emit('issues', getIssues(room));
    io.in(room).emit('getStatistic', getStat(room));
  });

  socket.on('setCurrentIssue', (id, room) => {
    setCurrentIssueClick(id);
    io.in(room).emit('issues', getIssues(room));
  });

  socket.on('nextIssue', (room) => {
    nextIssue(room);
    io.in(room).emit('issues', getIssues(room));
  });

  socket.on('setScoreIssue', (id, score, room) => {
    setScoreIssue(id, score);
    io.in(room).emit('issues', getIssues(room));
  });

  socket.on('disconnect', () => {
    deleteUser(socket.id);
  });

  socket.on('startTimer', (room) => {
    io.in(room).emit('startTimerUsers');
  });

  socket.on('joinRoom', (room) => {
    io.to(socket.id).emit('room', checkRoom(room));
  });

  socket.on('kickMember', (kickedUser, userAgainst) => {
    const { room, id } = kickedUser;

    if (userAgainst.role === 'scram-master') {
      deleteUser(id);
      io.to(id).emit('logout');
      io.in(room).emit('users', getUsers(room));
      const messageId = nanoid();

      io.in(room).emit('message', {
        ...kickedUser,
        text: 'Kicked by scram master',
        messageId,
        type: 'system',
      });
    } else {
      io.in(room).emit('startVoting');
      addVote(true, room);
      addVote(false, room);
      const users = getUsers(room);

      users.forEach((user) => {
        if (user.id !== kickedUser.id && user.id !== socket.id) {
          io.to(user.id).emit('showModal', kickedUser, userAgainst);
        }
      });
    }
  });

  socket.on('vote', (vote, kickedUser) => {
    const { room, id } = kickedUser;
    addVote(vote, room);
    const votes = getVotes(room);
    const users = getUsers(room);

    if (votes.length === users.length) {
      const result = getResult(votes);
      io.in(room).emit('endVoting');

      if (result) {
        deleteUser(id);
        io.to(id).emit('logout');
        io.in(room).emit('users', getUsers(room));
        const messageId = nanoid();

        io.in(room).emit('message', {
          ...kickedUser,
          text: 'Kicked by voting',
          messageId,
          type: 'system',
        });
      }

      deleteVotes(room);
    }
  });

  socket.on('titleEdited', (text, room) => {
    if (checkTitle(room)) {
      editTitle({ text, room });
    } else {
      addTitle({ text, room });
    }

    io.in(room).emit('titleSent', text);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
