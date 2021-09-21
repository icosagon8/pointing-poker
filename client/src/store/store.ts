import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import userSlice from './slices/userSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    users: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
