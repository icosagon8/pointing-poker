import { Vote } from './models/VoteModel';

const votes: Vote[] = [];

export const addVote = (decision: boolean, room: string): void => {
  votes.push({ decision, room });
};

export const getVotes = (room: string): Vote[] => votes.filter((vote) => vote.room === room);

export const deleteVotes = (room: string): void => {
  for (let i = votes.length - 1; i >= 0; i -= 1) {
    if (votes[i].room === room) votes.splice(i, 1);
  }
};

export const getResult = (roomVotes: Vote[]): boolean => {
  const votesFor = roomVotes.filter((vote) => vote.decision).length;
  const totalVotes = Math.floor(roomVotes.length / 2);

  return votesFor >= totalVotes + 1;
};
