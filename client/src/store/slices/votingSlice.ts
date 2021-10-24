import { createSlice } from '@reduxjs/toolkit';

interface VotingState {
  isVoting: boolean;
}

const initialState: VotingState = {
  isVoting: false,
};

const votingSlice = createSlice({
  name: 'voting',
  initialState,
  reducers: {
    startVoting: (state) => {
      state.isVoting = true;
    },
    endVoting: (state) => {
      state.isVoting = false;
    },
  },
});

export const { startVoting, endVoting } = votingSlice.actions;

export default votingSlice.reducer;
