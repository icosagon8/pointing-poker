import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import usersSlice from './slices/usersSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    users: usersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
