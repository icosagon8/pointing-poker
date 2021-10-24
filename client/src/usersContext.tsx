import React, { createContext, useState } from 'react';

interface Props {
  children: React.ReactNode;
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  position: string;
  role: string;
  avatar: string;
  room: string;
}

interface State {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UsersContext = createContext({} as State);

export const UsersProvider = ({ children }: Props): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  return <UsersContext.Provider value={{ users, setUsers }}>{children}</UsersContext.Provider>;
};
