import { StylesProvider } from '@material-ui/core/styles';
import { Header } from './components/Header/Header';
import { Home } from './pages/Home/Home';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <Header />
      <Home />
    </StylesProvider>
  );
}
