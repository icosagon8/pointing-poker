import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  firstname: string;
  lastname: string;
  position: string;
  role: string;
  avatar: string;
}

interface UserInitialState {
  user: UserState | null;
}

const initialState: UserInitialState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser } = userSlice.actions;

export default userSlice.reducer;
