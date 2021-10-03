import { createSlice } from '@reduxjs/toolkit';
import { GameVote } from '../../models/gameVote';

interface VoteState {
  votes: GameVote[];
}

const initialState: VoteState = {
  votes: [],
};

const gameVoteSlice = createSlice({
  name: 'gameVote',
  initialState,
  reducers: {
    addVote: (state, action) => {
      state.votes = state.votes.concat(action.payload);
    },
  },
});

export const { addVote } = gameVoteSlice.actions;

export default gameVoteSlice.reducer;
