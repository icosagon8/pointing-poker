import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/userModel';

interface UsersInitialState {
  users: UserModel[];
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
