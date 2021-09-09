import { StylesProvider } from '@material-ui/core/styles';
import { Header } from './components/Header/Header';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <Header />
    </StylesProvider>
  );
}
