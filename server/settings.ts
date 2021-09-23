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

export const getSettings = (data: SettingsModel): SettingsModel => {
  settings = { ...data };
  console.log(settings);

  return settings;
};
