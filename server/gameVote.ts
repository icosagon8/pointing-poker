import { RoundVotingUsers } from './models/RoundVotingUsersModel';
import { GameVote } from './models/gameVotesModel';
import { getSettings } from './settings';
import { addGameStat } from './statistic';

const gameVotes: GameVote[] = [];
const roomVotingUsers: RoundVotingUsers[] = [];

export const addRoundVotingUsers = (votingUsers: RoundVotingUsers): void => {
  roomVotingUsers.push(votingUsers);
};

export const deleteRoundVotingUsers = (room: string): RoundVotingUsers | undefined => {
  const index = roomVotingUsers.findIndex((votingUsers) => votingUsers.room === room);
  if (index !== -1) return roomVotingUsers.splice(index, 1)[0];
  return undefined;
};

export const getRoundVotingUsers = (room: string): RoundVotingUsers => {
  const votingUsers = roomVotingUsers.find((votingUserss) => votingUserss.room === room) as RoundVotingUsers;
  return votingUsers;
};

export const addGameVote = (gameVote: GameVote): boolean => {
  gameVotes.push(gameVote);

  if (
    gameVotes.filter((vote) => vote.roomId === gameVote.roomId && vote.issueId === gameVote.issueId).length ===
    getRoundVotingUsers(gameVote.roomId).count
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
