import { GameVote } from './models/gameVotesModel';
import { getUsers } from './users';

const gameVotes: GameVote[] = [];

export const addGameVote = (gameVote: GameVote): boolean => {
  gameVotes.push(gameVote);
  return gameVotes.length === getUsers(gameVote.roomId).length;
};

export const getGameVotes = (room: string): GameVote[] => gameVotes.filter((vote) => vote.roomId === room);

export const removeGameVotes = (room: string): void => {
  for (let i = 0; i < gameVotes.length; i++) {
    if (gameVotes[i].roomId === room) gameVotes.splice(i, 1);
  }
};
