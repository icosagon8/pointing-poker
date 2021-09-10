import './GamePage.scss';
import { Container, Typography, Button } from '@material-ui/core';
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
      <div className="page-game__main">
        <Typography className="page-game__title page-title" align="center" component="h2" variant="h2">
          {titlePage}
        </Typography>
        <MemberCard name="John Lennon" position="pm" src="f4w33efr4" />
        <Button className="page-game__btn page-game__btn-outlined" variant="outlined">
          Stop Game
        </Button>
        <IssueList />
        <Timer time={70} start />
        <Button className="page-game__btn page-game__btn-primary" variant="contained" color="primary">
          Run Round
        </Button>
        <Button className="page-game__btn page-game__btn-primary" variant="contained" color="primary">
          Next ISSUE
        </Button>
        <Statistics />
        <CardList />
      </div>
      <div className="page-game__aside">
        <MemberCardList members={members} />
      </div>
    </Container>
  );
}
