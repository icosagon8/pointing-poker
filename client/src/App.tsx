import { StylesProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketProvider } from './socketContext';
import { Header } from './components/Header/Header';
import { ROUTES } from './routes';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <SocketProvider>
        <Router>
          <Header />
          <Switch>
            {ROUTES.map((route) => (
              <Route path={route.path} exact={route.exact} component={route.component} key={route.path} />
            ))}
          </Switch>
        </Router>
      </SocketProvider>
    </StylesProvider>
  );
}
