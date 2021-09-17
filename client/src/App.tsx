import { StylesProvider } from '@material-ui/core/styles';
import { Header } from './components/Header/Header';
import { GamePage } from './pages/GamePage/GamePage';
import { LobbyPage } from './pages/LobbyPage/LobbyPage';
import { SocketProvider } from './socketContext';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <SocketProvider>
        <Header />
        <GamePage />
        <LobbyPage />
      </SocketProvider>
    </StylesProvider>
  );
}
