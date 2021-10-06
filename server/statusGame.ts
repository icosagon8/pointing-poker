import { StatusGameModel } from './models/statusGameModel';

const statusGames: StatusGameModel[] = [];

export const addStatus = ({ statusGame, room }: StatusGameModel): void => {
  const checkRoom = statusGames.some((item) => item.room === room);
  if (!checkRoom) {
    const newStatus = { statusGame, room };
    statusGames.push(newStatus);
  }
};

export const waitingGame = (room: string): void => {
  const statusGame = statusGames.find((item) => item.room === room) as StatusGameModel;
  statusGame.statusGame = 'waiting-game';
};

export const gameInProgress = (room: string): void => {
  const statusGame = statusGames.find((item) => item.room === room) as StatusGameModel;
  statusGame.statusGame = 'game-in-progress';
};

export const roundInProgress = (room: string): void => {
  const statusGame = statusGames.find((item) => item.room === room) as StatusGameModel;
  statusGame.statusGame = 'round-in-progress';
};

export const endGame = (room: string): void => {
  const statusGame = statusGames.find((item) => item.room === room) as StatusGameModel;
  statusGame.statusGame = 'end-game';
};

export const deleteStatusGameInRoom = (room: string): void => {
  for (let i = statusGames.length - 1; i >= 0; i -= 1) {
    if (statusGames[i].room === room) statusGames.splice(i, 1);
  }
};

export const checkStatusGame = (room: string): string => {
  const statusGame = statusGames.find((item) => item.room === room) as StatusGameModel;
  if (!statusGame) {
    return 'waiting-game';
  }
  return statusGame.statusGame;
};

export const getStatusGame = (room: string): string => {
  const statusGame = statusGames.find((item) => item.room === room) as StatusGameModel;
  return statusGame.statusGame;
};
