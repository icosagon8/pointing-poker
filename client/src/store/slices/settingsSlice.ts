import { createSlice } from '@reduxjs/toolkit';
import { SettingsFormInput } from '../../models/SettingsFormInput';

interface SettingsInitialState {
  settings: SettingsFormInput;
}

const initialState: SettingsInitialState = {
  settings: {
    masterAsPlayer: false,
    changingCard: false,
    timerIsNeeded: false,
    scoreType: '',
    scoreTypeShort: '',
    timerHours: '',
    timerMinutes: '',
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    getSettings: (state, action) => {
      state.settings = { ...action.payload };
    },
  },
});

export const { getSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
