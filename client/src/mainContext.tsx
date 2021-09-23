import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface User {
  firstname: string;
  lastname: string;
  position: string;
  role: string;
  avatar: string;
}

interface State {
  user: User | null;
  room: string;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  setRoom: React.Dispatch<React.SetStateAction<string>>;
}

export const MainContext = createContext({} as State);

export const MainProvider = ({ children }: Props): JSX.Element => {
  const [user, setUser] = useState<User | null>(null);
  const [room, setRoom] = useState<string>('');

  return <MainContext.Provider value={{ user, room, setUser, setRoom }}>{children}</MainContext.Provider>;
};
