import { SettingsModel } from './models/SettingsModel';

const settings: SettingsModel[] = [];

export const sendSettings = (data: SettingsModel): SettingsModel[] => {
  settings.push(data);
  return settings;
};

export const getSettings = (room: string): SettingsModel => {
  return settings.filter((item) => item.roomId === room)[0];
};
