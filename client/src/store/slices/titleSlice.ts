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
    resetTitle: (state) => {
      state.title = initialState.title;
    },
  },
});

export const { setTitle, resetTitle } = titleSlice.actions;

export default titleSlice.reducer;
