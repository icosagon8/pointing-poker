import { SettingsModel } from './models/SettingsModel';

const settings: SettingsModel[] = [];

export const sendSettings = (data: SettingsModel): SettingsModel[] => {
  settings.push(data);
  return settings;
};

export const getSettings = (room: string): SettingsModel => {
  return settings.filter((item) => item.roomId === room)[0];
};

export const getSettingsAdmitUser = (room: string): boolean => {
  const settingsInRoom = settings.find((setting) => setting.roomId === room) as SettingsModel;
  return settingsInRoom?.admitNewUser;
}
