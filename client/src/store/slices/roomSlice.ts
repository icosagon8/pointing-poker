import { createSlice } from '@reduxjs/toolkit';

interface RoomState {
  room: string;
}

const initialState: RoomState = {
  room: '',
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    addRoom: (state, action) => {
      state.room = action.payload;
    },
  },
});

export const { addRoom } = roomSlice.actions;

export default roomSlice.reducer;
