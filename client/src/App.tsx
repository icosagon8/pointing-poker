import { StylesProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketProvider } from './socketContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ROUTES } from './routes';
import { UsersProvider } from './usersContext';
import { store } from './store/store';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <Provider store={store}>
        <UsersProvider>
          <SocketProvider>
            <Router>
              <Header />
              <Switch>
                {ROUTES.map((route) => (
                  <Route path={route.path} exact={route.exact} component={route.component} key={route.path} />
                ))}
              </Switch>
              <Footer />
            </Router>
          </SocketProvider>
        </UsersProvider>
      </Provider>
    </StylesProvider>
  );
}
