import './GamePage.scss';
import { useState, useContext, useEffect } from 'react';
import { Container, Grid, Button } from '@material-ui/core';
import { Title } from '../../components/Title/Title';
import { IssueList } from '../../components/IssueList/IssueList';
import { MemberCard } from '../../components/MemberCard/MemberCard';
import { MemberCardList } from '../../components/MemberCardList/MemberCardList';
import { Timer } from '../../components/Timer/Timer';
import { Statistics } from '../../components/Statistics/Statistics';
import { CardList } from '../../components/CardList/CardList';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { SocketContext } from '../../socketContext';
import { gameInProgress } from '../../store/slices/statusGameSlice';
import { UserModel } from '../../models/userModel';

const members = [
  { id: '13423', name: 'Alex', lastname: 'Doe', position: 'driver', src: 'adsasd2rr23' },
  { id: '43513325423', name: 'Kim Foon', lastname: 'Doe', src: 'adsasd2rr23' },
  { id: '213423', name: 'Li', lastname: 'Doe', position: 'driver', src: 'adsasd2rr23' },
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
  const { socket } = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const [role] = useState<string>('scram-master');
  const [play, setPlay] = useState<boolean>(false);
  const [location] = useState<string>('game-page');
  const users = useAppSelector((state) => state.users.users);
  const room = useAppSelector((state) => state.room.room);
  const title = useAppSelector((state) => state.title.title);
  const scramMaster = users.find((item) => item.role === 'scram-master') as UserModel;

  useEffect(() => {
    dispatch(gameInProgress());
    socket?.on('loginRequest', (firstname, lastname) => {
      console.log(`Do you want to add a user ${firstname} ${lastname}?`);
    });
  }, [socket, dispatch]);

  const handleClickNextIssue = () => {
    socket?.emit('nextIssue', room);
  };

  return (
    <Container className="page-game">
      <Grid container>
        <Grid item xs={8}>
          <Title title={title} />
          <Grid container alignItems="flex-end" justifyContent="space-between">
            <Grid item xs={4}>
              <MemberCard
                name={scramMaster?.firstname}
                lastname={scramMaster?.lastname}
                src={scramMaster?.avatar}
                position={scramMaster?.position}
              />
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
              <IssueList />
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
