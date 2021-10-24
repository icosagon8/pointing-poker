import { createSlice } from '@reduxjs/toolkit';
import { UserModel } from '../../models/userModel';

interface UserInitialState {
  user: UserModel | null;
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
    deleteUser: (state) => {
      state.user = null;
    },
  },
});

export const { addUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
