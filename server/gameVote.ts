import { GameVote } from './models/gameVotesModel';

let gameVotes: GameVote[] = [];

export const addGameVote = (gameVote: GameVote): void => {
  gameVotes.push(gameVote);
};

export const getGameVotes = (room: string): GameVote[] => gameVotes.filter((vote) => vote.roomId === room);

export const removeGameVotes = (room: string): void => {
  gameVotes = gameVotes.filter((vote) => vote.roomId !== room);
};
