import { createSlice } from '@reduxjs/toolkit';

interface GameState {
  statusGame: string;
}

const initialState: GameState = {
  statusGame: 'before-game',
};

const statusGameSlice = createSlice({
  name: 'statusGame',
  initialState,
  reducers: {
    beforeGameStatusGame: (state) => {
      state.statusGame = 'before-game';
    },
    waitingGame: (state) => {
      state.statusGame = 'waiting-game';
    },
    gameInProgress: (state) => {
      state.statusGame = 'game-in-progress';
    },
    roundInProgress: (state) => {
      state.statusGame = 'round-in-progress';
    },
    endGame: (state) => {
      state.statusGame = 'end-game';
    },
  },
});

export const { waitingGame, gameInProgress, endGame, beforeGameStatusGame, roundInProgress } = statusGameSlice.actions;

export default statusGameSlice.reducer;
