import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { RootState } from '../store';

interface ChatState {
  isOpen: boolean;
}

const initialState: ChatState = {
  isOpen: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    on: (state) => {
      state.isOpen = true;
    },
    off: (state) => {
      state.isOpen = false;
    },
  },
});

export const { on, off } = chatSlice.actions;

export const selectState = (state: RootState) => state.chat.isOpen;

export default chatSlice.reducer;
