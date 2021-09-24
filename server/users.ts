import { UserModel } from './models/UserModel';

const users: UserModel[] = [];

export const addUser = ({ id, firstname, lastname, position, role, avatar, room }: UserModel): UserModel => {
  const user = { id, firstname, lastname, position, role, avatar, room };
  users.push(user);
  return user;
};

export const getUser = (id: string): UserModel => {
  const user = users.find((currentUser) => currentUser.id === id) as UserModel;
  return user;
};

export const deleteUser = (id: string): UserModel | undefined => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
  return undefined;
};

export const deleteUsersInRoom = (room: string): void => {
  for (let i = users.length - 1; i >= 0; i -= 1) {
    if (users[i].room === room) users.splice(i, 1);
  }
};

export const getUsers = (room: string): UserModel[] => users.filter((user) => user.room === room);

export const checkRoom = (room: string): boolean => users.some((user: UserModel) => user.room === room);
