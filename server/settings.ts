import { SettingsModel } from './models/SettingsModel';

const settings: SettingsModel[] = [];

export const sendSettings = (data: SettingsModel): SettingsModel[] => {
  settings.push(data);
  return settings;
};
