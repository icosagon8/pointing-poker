import { createSlice } from '@reduxjs/toolkit';

interface UserState {
  id: string;
  firstname: string;
  lastname: string;
  position: string;
  role: string;
  avatar: string;
  room: string;
}

interface UserInitialState {
  users: UserState[];
}

const initialState: UserInitialState = {
  users: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUsers: (state, action) => {
      state.users = action.payload;
    },
  },
});

export const { addUsers } = usersSlice.actions;

export default usersSlice.reducer;
