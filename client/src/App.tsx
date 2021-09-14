import { StylesProvider } from '@material-ui/core/styles';
import { Header } from './components/Header/Header';
import { SocketProvider } from './socketContext';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <SocketProvider>
        <Header />
      </SocketProvider>
    </StylesProvider>
  );
}
