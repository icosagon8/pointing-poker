import { configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import chatReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
