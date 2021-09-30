import { createSlice } from '@reduxjs/toolkit';

interface GameState {
  statusGame: string;
}

const initialState: GameState = {
  statusGame: '',
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
    deleteStatusGame: (state) => {
      state.statusGame = '';
    },
  },
});

export const { waitingGame, gameInProgress, endGame, deleteStatusGame } = statusGameSlice.actions;

export default statusGameSlice.reducer;
