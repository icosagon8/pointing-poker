import { Home } from './pages/Home/Home';
import { LobbyPage } from './pages/LobbyPage/LobbyPage';
import { GamePage } from './pages/GamePage/GamePage';

interface RouteModel {
  path: string;
  exact: boolean;
  component: React.FunctionComponent;
}

export const ROUTES: RouteModel[] = [
  {
    path: '/',
    exact: true,
    component: Home,
  },
  {
    path: '/lobby',
    exact: true,
    component: LobbyPage,
  },
  {
    path: '/game',
    exact: true,
    component: GamePage,
  },
];
