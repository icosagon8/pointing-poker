import React, { useState } from 'react';
import { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface Props {
  children: React.ReactNode;
}

interface State {
  socket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket<DefaultEventsMap, DefaultEventsMap> | null>>;
}

export const SocketContext = React.createContext({} as State);

export const SocketProvider = ({ children }: Props): JSX.Element => {
  const [socket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);
  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};
