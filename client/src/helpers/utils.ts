import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';
import { UserModel } from '../models/userModel';
import { MIN_VOTING_MEMBERS } from './constants';

export function getInitials(name: string, lastname?: string): string | null {
  if (name && lastname) return `${name[0]}${lastname[0]}`;
  if (name) return `${name[0]}${name[name.length - 1]}`;
  if (lastname) return `${lastname[0]}${lastname[lastname.length - 1]}`;
  return null;
}

export function parsePath(url: string): string {
  return new URL(url).pathname.slice(1);
}

export const fibonacci = (n: number): number => {
  let [prev, next] = [0, 1];

  for (let i = 0; i < n; i++) {
    const temp = next;
    next = prev + next;
    prev = temp;
  }

  return prev;
};

export const power2 = (n: number): number => 2 ** n;

export const kickMember = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null,
  kicked: UserModel,
  userAgainst: UserModel
): void => {
  socket?.emit('kickMember', kicked, userAgainst);
};

export const checkUser = (
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null,
  member: UserModel,
  members: UserModel[],
  isVoting: boolean
): boolean => {
  return !(
    socket?.id === member.id ||
    member.role === 'scram-master' ||
    members.length < MIN_VOTING_MEMBERS ||
    members.findIndex((item) => item.id === member.id) === -1 ||
    isVoting
  );
};
