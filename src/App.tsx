import { StylesProvider } from '@material-ui/core/styles';
import { Header } from './components/Header/Header';
import { GamePage } from './pages/GamePage/GamePage';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <Header />
    </StylesProvider>
  );
}
