import './GamePage.scss';
import { Container, Typography, Grid, Button } from '@material-ui/core';
import GamePageType from '../../models/iGamePage';
import { IssueList } from '../../components/IssueList/IssueList';
import { MemberCard } from '../../components/MemberCard/MemberCard';
import { MemberCardList } from '../../components/MemberCardList/MemberCardList';
import { Timer } from '../../components/Timer/Timer';
import { Statistics } from '../../components/Statistics/Statistics';
import { CardList } from '../../components/CardList/CardList';

const members = [
  { id: 13423, name: 'Alex', position: 'driver', src: 'adsasd2rr23' },
  { id: 43513325423, name: 'Kim Foon', src: 'adsasd2rr23' },
  { id: 213423, name: 'Li', position: 'driver', src: 'adsasd2rr23' },
];

export function GamePage(props: GamePageType): JSX.Element {
  const { titlePage } = props;
  return (
    <Container className="page-game">
      <Grid container>
        <Grid item xs={9}>
          <Typography className="page-game__title page-title" align="center" component="h2" variant="h2">
            {titlePage}
          </Typography>
          <Grid container alignItems="flex-end" justifyContent="space-between">
            <Grid item xs={4}>
              <MemberCard />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Timer time={70} start />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Button className="page-game__btn page-game__btn-outlined" variant="outlined">
                Stop Game
              </Button>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <IssueList />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Button className="page-game__btn page-game__btn-primary" variant="contained" color="primary">
                Run Round
              </Button>
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Button className="page-game__btn page-game__btn-primary" variant="contained" color="primary">
                Next ISSUE
              </Button>
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <Statistics />
            </Grid>
            <Grid item xs={6}>
              <CardList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3} className="page-game__aside">
          <MemberCardList members={members} />
        </Grid>
      </Grid>
    </Container>
  );
}
