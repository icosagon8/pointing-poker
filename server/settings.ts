import { SettingsModel } from './models/SettingsModel';

let settings: SettingsModel = {
  masterAsPlayer: false,
  changingCard: false,
  timerIsNeeded: false,
  scoreType: '',
  scoreTypeShort: '',
  timerHours: '',
  timerMinutes: '',
};

export const setSettings = (data: SettingsModel): SettingsModel => {
  settings = { ...data };
  return settings;
};

export const getSettings = (): SettingsModel => {
  return settings;
};
