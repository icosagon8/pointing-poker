import './GamePage.scss';
import { Container, Typography, Button } from '@material-ui/core';
import GamePageType from '../../models/iGamePage';
import { IssueList } from '../../components/IssueList/IssueList';
import { Timer } from '../../components/Timer/Timer';

export function GamePage(props: GamePageType): JSX.Element {
  const { titlePage } = props;
  return (
    <Container className="page-game">
      <Typography className="page-game__title page-title" align="center" component="h2" variant="h2">
        {titlePage}
      </Typography>
      <Button className="page-game__btn-primary btn" variant="outlined">
        Stop Game
      </Button>
      <IssueList />
      <Timer time={90} />
      <Button className="page-game__btn" variant="contained" color="primary">
        Run Round
      </Button>
    </Container>
  );
}
