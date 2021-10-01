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
    waitingGame: (state) => {
      state.statusGame = 'waiting-game';
    },
    gameInProgress: (state) => {
      state.statusGame = 'game-in-progress';
    },
    endGame: (state) => {
      state.statusGame = 'end-game';
    },
    beforeGameStatusGame: (state) => {
      state.statusGame = 'before-game';
    },
  },
});

export const { waitingGame, gameInProgress, endGame, beforeGameStatusGame } = statusGameSlice.actions;

export default statusGameSlice.reducer;
