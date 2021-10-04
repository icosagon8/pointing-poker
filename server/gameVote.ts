import { GameVote } from './models/gameVotesModel';
import { GameStatisticModel } from './models/staticticModel';
import { getSettings } from './settings';
import { addGameStat } from './statistic';
import { getUsers } from './users';

const gameVotes: GameVote[] = [];

export const addGameVote = (gameVote: GameVote): boolean => {
  gameVotes.push(gameVote);
  if (
    gameVotes.filter((vote) => vote.roomId === gameVote.roomId && vote.issueId === gameVote.issueId).length ===
    getUsers(gameVote.roomId).length
  ) {
    const cards = getSettings(gameVote.roomId).cardsValue;
    const arr = gameVotes
      .filter((vote) => vote.roomId === gameVote.roomId && vote.issueId === gameVote.issueId)
      .map((vote) => vote.cardId);
    const res = [];
    for (let i = 0; i < cards.length; i++) {
      const proc = (arr.filter((item) => item === cards[i].id).length * 100) / arr.length;
      res.push({ cardId: cards[i].id, percent: proc });
    }

    addGameStat({
      roomId: gameVote.roomId,
      issueId: gameVote.issueId,
      results: res,
    });
    return true;
  }
  return false;
};

export const getGameVotes = (room: string): GameVote[] => gameVotes.filter((vote) => vote.roomId === room);

export const removeGameVotes = (room: string): void => {
  for (let i = 0; i < gameVotes.length; i++) {
    if (gameVotes[i].roomId === room) gameVotes.splice(i, 1);
  }
};
