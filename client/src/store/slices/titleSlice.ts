import { createSlice } from '@reduxjs/toolkit';

interface TitleState {
  title: string;
}

const initialState: TitleState = {
  title: 'Meeting',
};

const titleSlice = createSlice({
  name: 'title',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
  },
});

export const { setTitle } = titleSlice.actions;

export default titleSlice.reducer;
