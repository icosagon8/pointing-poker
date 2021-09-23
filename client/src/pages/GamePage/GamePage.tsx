import './GamePage.scss';
import { useState, useEffect, useContext } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import IssueCard from '../../models/iIssueCard';
import { Title } from '../../components/Title/Title';
import { IssueList } from '../../components/IssueList/IssueList';
import { MemberCard } from '../../components/MemberCard/MemberCard';
import { MemberCardList } from '../../components/MemberCardList/MemberCardList';
import { Timer } from '../../components/Timer/Timer';
import { Statistics } from '../../components/Statistics/Statistics';
import { CardList } from '../../components/CardList/CardList';
import { SocketContext } from '../../socketContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getSettings } from '../../store/slices/settingsSlice';

const members = [
  { id: '13423', name: 'Alex', position: 'driver', src: 'adsasd2rr23' },
  { id: '43513325423', name: 'Kim Foon', src: 'adsasd2rr23' },
  { id: '213423', name: 'Li', position: 'driver', src: 'adsasd2rr23' },
];
const gameCards = [
  { id: '35635463', title: 'sp', value: '2' },
  { id: '990934', title: 'sp', value: '5' },
  { id: '1234090', title: 'sp', value: '1' },
];
const gameCardsStat = [
  { id: '35635463', title: 'sp', value: '2', percent: 90.5 },
  { id: '990934', title: 'sp', value: '5', percent: 7.2 },
  { id: '1234090', title: 'sp', value: '1', percent: 2.3 },
];

export function GamePage(): JSX.Element {
  const [issuesState, setIssuesState] = useState<IssueCard[]>([
    { id: '1029341', title: 'Issue 1', priority: 'Low prority' },
    { id: '3452346', title: 'Issue 2', priority: 'High prority' },
    { id: '9000563', title: 'Issue 3', priority: 'Low prority' },
    { id: '999933', title: 'Issue 4', priority: 'Low prority' },
    { id: '409243000', title: 'Issue 5', priority: 'Low prority' },
  ]);
  const [role] = useState<string>('scram-master');
  const [play, setPlay] = useState<boolean>(false);
  const [location] = useState<string>('game-page');
  const [indexIssue, setIndexIssue] = useState<number>(0);
  const [currentId, setCurrentId] = useState<string>(issuesState[indexIssue].id);
  const { socket } = useContext(SocketContext);
  const settings = useAppSelector((state) => state.settings.settings);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setIndexIssue(issuesState.findIndex((elem: IssueCard) => elem.id === currentId));
  }, [issuesState, currentId]);

  useEffect(() => {
    setCurrentId(issuesState[indexIssue].id);
  }, [issuesState, indexIssue]);

  useEffect(() => {
    socket?.on('settings', (item) => {
      dispatch(getSettings(item));
    });
  }, [socket, dispatch]);

  const handleClickNextIssue = () => {
    const maxIndex = issuesState.length - 1;
    if (indexIssue < maxIndex) {
      setIndexIssue((prev) => prev + 1);
    }
  };

  const handleSetIssueState = (issues: IssueCard[]) => {
    setIssuesState(issues);
  };

  return (
    <Container className="page-game">
      <Grid container>
        <Grid item xs={8}>
          <Title title="Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)" />
          <Grid container alignItems="flex-end" justifyContent="space-between">
            <Grid item xs={4}>
              <MemberCard name="John" position="position" src="weokfnwoiefoi" />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              <Timer start={play} location={location} />
            </Grid>
            <Grid item container xs={4} justifyContent="center">
              {role === 'scram-master' && play ? (
                <Button
                  className="page-game__btn page-game__btn-outlined"
                  variant="outlined"
                  onClick={() => setPlay(false)}
                >
                  Stop Game
                </Button>
              ) : (
                <Button className="page-game__btn page-game__btn-outlined" variant="outlined">
                  Exit
                </Button>
              )}
            </Grid>
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <IssueList
                issues={issuesState}
                setIssueState={handleSetIssueState}
                role={role}
                currentId={currentId}
                setCurrentId={setCurrentId}
              />
            </Grid>
            {role === 'scram-master' && !play ? (
              <>
                <Grid item container xs={4} justifyContent="center">
                  <Button
                    className="page-game__btn page-game__btn-primary"
                    variant="contained"
                    color="primary"
                    onClick={() => setPlay(true)}
                  >
                    Run Round
                  </Button>
                </Grid>
                <Grid item container xs={4} justifyContent="center">
                  <Button
                    className="page-game__btn page-game__btn-primary"
                    variant="contained"
                    color="primary"
                    onClick={handleClickNextIssue}
                  >
                    Next ISSUE
                  </Button>
                </Grid>
              </>
            ) : null}
          </Grid>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item xs={4}>
              <Statistics gameCardsStat={gameCardsStat} />
            </Grid>
            <Grid item xs={6}>
              <CardList gameCards={gameCards} />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} className="page-game__aside">
          <MemberCardList members={members} />
        </Grid>
      </Grid>
    </Container>
  );
}
