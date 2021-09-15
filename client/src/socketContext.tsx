import React from 'react';
import io, { Socket } from 'socket.io-client';
import { DefaultEventsMap } from 'socket.io-client/build/typed-events';

interface Props {
  children: React.ReactNode;
}

export const SocketContext = React.createContext({} as Socket<DefaultEventsMap, DefaultEventsMap>);

export const SocketProvider = ({ children }: Props): JSX.Element => {
  const ENDPOINT = 'http://localhost:8080';
  const socket = io(ENDPOINT, { transports: ['websocket', 'polling'] });

  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};
