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
import { AcceptUserModal } from '../../components/AcceptUserModal/AcceptUserModal';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { SocketContext } from '../../socketContext';
import { gameInProgress } from '../../store/slices/statusGameSlice';
import { UserModel } from '../../models/userModel';
import { addVote } from '../../store/slices/gameVoteSlice';
import { addStatistic } from '../../store/slices/statisticSlice';
import { KickUserModal } from '../../components/KickUserModal/KickUserModal';

export function GamePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const [play, setPlay] = useState<boolean>(false);
  const [location] = useState<string>('game-page');
  const users = useAppSelector((state) => state.users.users);
  const user = useAppSelector((state) => state.user.user);
  const room = useAppSelector((state) => state.room.room);
  const scramMaster = users.find((item) => item.role === 'scram-master') as UserModel;
  const title = useAppSelector((state) => state.title.title);
  const [timerIsOver, setTimerIsOver] = useState<boolean>(false);
  const settings = useAppSelector((state) => state.settings.settings);
  const [currentId, setCurrentId] = useState<string>('');
  const currentIssueId = useAppSelector((state) => state.issues.issues.find((issue) => issue.current))?.id;
  const cards = settings?.cardsValue.map((card) => {
    return {
      ...card,
      title: settings.scoreTypeShort,
    };
  });

  useEffect(() => {
    socket?.on('getStatistic', (result) => {
      dispatch(addStatistic(result));
    });

    socket?.on('stopTimerUsers', () => {
      setPlay(false);
      setTimerIsOver(false);
      setCurrentId('');
    });

    socket?.on('getGameVote', (vote) => {
      dispatch(addVote(vote));
    });

    socket?.on('startTimerUsers', () => {
      setPlay(true);
      setTimerIsOver(false);
    });
  }, [dispatch, socket]);

  useEffect(() => {
    if (timerIsOver) {
      if (user?.role === 'player' || (user?.role === 'scram-master' && settings?.masterAsPlayer)) {
        socket?.emit('sendGameVote', {
          roomId: room,
          issueId: currentIssueId,
          userId: socket?.id,
          cardId: currentId,
        });
      }

      setTimerIsOver(false);
      setPlay(false);
      setCurrentId('');
    }
  }, [currentId, currentIssueId, room, socket, timerIsOver, play, user?.role, settings?.masterAsPlayer]);

  const timerIsOverHandler = () => {
    setTimerIsOver(true);
    setPlay(false);
  };

  useEffect(() => {
    dispatch(gameInProgress());
  }, [dispatch]);

  const handleClickNextIssue = () => {
    socket?.emit('nextIssue', room);
  };

  return (
    <Container className="page-game">
      <Grid container>
        <Grid className="page-game__main" item xs={12} md={7} lg={8}>
          <Title title={title} />
          <Grid className="page-game__start" container alignItems="flex-end" justifyContent="space-between">
            <MemberCard
              name={scramMaster?.firstname}
              lastname={scramMaster?.lastname}
              src={scramMaster?.avatar}
              position={scramMaster?.position}
              kickButtonDisplay={false}
            />
            <Timer start={play} timerIsOverHandler={timerIsOverHandler} location={location} />
            {user?.role === 'scram-master' && play ? (
              <Button
                className="page-game__btn page-game__btn-outlined"
                variant="outlined"
                onClick={() => {
                  socket?.emit('stopTimer', room);
                }}
              >
                Stop Game
              </Button>
            ) : (
              <Button className="page-game__btn page-game__btn-outlined" variant="outlined">
                Exit
              </Button>
            )}
          </Grid>
          {user?.role === 'scram-master' && !play ? (
            <div className="page-game__btn-container">
              <Button
                className="page-game__btn page-game__btn-primary"
                variant="contained"
                color="primary"
                onClick={() => {
                  socket?.emit('startTimer', room);
                }}
              >
                Run Round
              </Button>
              <Button
                className="page-game__btn page-game__btn-primary"
                variant="contained"
                color="primary"
                onClick={handleClickNextIssue}
              >
                Next ISSUE
              </Button>
            </div>
          ) : null}
          <IssueList />
          {(user?.role === 'player' || (user?.role === 'scram-master' && settings?.masterAsPlayer)) && cards && (
            <CardList gameCards={cards} currentId={currentId} setCurrentId={setCurrentId} />
          )}
        </Grid>
        <Grid item xs={12} md={5} lg={4} className="page-game__aside">
          <MemberCardList />
          <Statistics />
        </Grid>
      </Grid>
      <AcceptUserModal />
      <KickUserModal />
    </Container>
  );
}
