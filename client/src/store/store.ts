import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices/chatSlice';
import userSlice from './slices/userSlice';
import roomSlice from './slices/roomSlice';
import usersSlice from './slices/usersSlice';
import settingsSlice from './slices/settingsSlice';
import issuesSlice from './slices/issuesSlice';
import issueSlice from './slices/issueSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user: userSlice,
    room: roomSlice,
    users: usersSlice,
    settings: settingsSlice,
    issues: issuesSlice,
    issue: issueSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
