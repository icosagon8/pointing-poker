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

interface UsersInitialState {
  users: UserState[];
}

const initialState: UsersInitialState = {
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
