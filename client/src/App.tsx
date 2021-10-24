import { StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SocketProvider } from './socketContext';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { ROUTES } from './routes';
import { store } from './store/store';
import { theme } from './MuiTheme';

export function App(): JSX.Element {
  return (
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SocketProvider>
            <Router>
              <div className="app">
                <Header />
                <Switch>
                  {ROUTES.map((route) => (
                    <Route path={route.path} exact={route.exact} component={route.component} key={route.path} />
                  ))}
                </Switch>
                <Footer />
              </div>
            </Router>
          </SocketProvider>
        </Provider>
      </ThemeProvider>
    </StylesProvider>
  );
}
