import { createSlice } from '@reduxjs/toolkit';
import { SettingsFormInput } from '../../models/SettingsFormInput';

interface SettingsInitialState {
  settings: SettingsFormInput | null;
}

const initialState: SettingsInitialState = {
  settings: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveSettings: (state, action) => {
      state.settings = { ...action.payload };
    },
  },
});

export const { saveSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
