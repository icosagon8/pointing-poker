import './Home.scss';
import { Container, Grid } from '@material-ui/core';
import image from '../../assets/images/cards.png';
import { StartHome } from '../../components/StartHome/StartHome';

export function Home(): JSX.Element {
  return (
    <main className="page page-home">
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
      </Container>
    </main>
  );
}
