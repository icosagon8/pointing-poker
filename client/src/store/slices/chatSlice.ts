import { createSlice } from '@reduxjs/toolkit';

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

export default chatSlice.reducer;
