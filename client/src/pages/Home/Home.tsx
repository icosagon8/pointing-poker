import './Home.scss';
import { useContext, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { io } from 'socket.io-client';
import image from '../../assets/images/cards.png';
import { StartHome } from '../../components/StartHome/StartHome';
import { RejectEnterModal } from '../../components/RejectEnterModal/RejectEnterModal';
import { SocketContext } from '../../socketContext';

export function Home(): JSX.Element {
  const { setSocket } = useContext(SocketContext);

  useEffect(() => {
    const ENDPOINT = 'https://pointing-poker-server-rss.herokuapp.com/';
    const newSocket = io(ENDPOINT, { transports: ['websocket', 'polling'] });
    setSocket(newSocket);
  }, [setSocket]);

  return (
    <main className="page page-home app__main">
      <Container>
        <div className="page__wrapper page-home__wrapper">
          <div className="page-home__title-wrapper">
            <img src={image} alt="Poker Planning" width="104" height="104" />
            <h1 className="page-home__title">
              <span className="page-home__title-word">Poker</span>
              <span className="page-home__title-word page-home__title-word--right">Planning</span>
            </h1>
          </div>
          <Grid container>
            <Grid item xs={12} md={7}>
              <StartHome />
            </Grid>
          </Grid>
        </div>
        <RejectEnterModal />
      </Container>
    </main>
  );
}
