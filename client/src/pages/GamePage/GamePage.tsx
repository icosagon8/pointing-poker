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
import { endGame, gameInProgress, roundInProgress } from '../../store/slices/statusGameSlice';
import { UserModel } from '../../models/userModel';
import { addVote } from '../../store/slices/gameVoteSlice';
import { addStatistic } from '../../store/slices/statisticSlice';
import { KickUserModal } from '../../components/KickUserModal/KickUserModal';
import { DELAY_WITHOUT_TIMER } from '../../helpers/constants';
import { Issue } from '../../components/Issue/Issue';
import { PriorityEnum, IssueModel } from '../../models/issueModel';

export function GamePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const [play, setPlay] = useState<boolean>(false);
  const [location] = useState<string>('game-page');
  const gameStatus = useAppSelector((state) => state.statusGame.statusGame);
  const users = useAppSelector((state) => state.users.users);
  const user = useAppSelector((state) => state.user.user);
  const room = useAppSelector((state) => state.room.room);
  const scramMaster = users.find((item) => item.role === 'scram-master') as UserModel;
  const title = useAppSelector((state) => state.title.title);
  const [timerIsOver, setTimerIsOver] = useState<boolean>(false);
  const settings = useAppSelector((state) => state.settings.settings);
  const [currentId, setCurrentId] = useState<string>('');
  const currentIssue = useAppSelector((state) => state.issues.issues.find((issue) => issue.current)) as IssueModel;
  const currentIssueId = currentIssue?.id;

  const mockRes = [
    {
      issueId: '1',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
    {
      issueId: '2',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
    {
      issueId: '3',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
    {
      issueId: '4',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
  ];

  const mockIssues = [
    {
      id: '1',
      title: 'first',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: false,
      link: '1',
      description: '1',
    },
    {
      id: '2',
      title: 'second',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: false,
      link: '1',
      description: '1',
    },
    {
      id: '3',
      title: 'third',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: false,
      link: '1',
      description: '1',
    },
    {
      id: '4',
      title: 'forth',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: true,
      link: '1',
      description: '1',
    },
  ];

  const mockCards = [
    {
      id: 'c1',
      value: '1',
      title: 'da',
    },
    {
      id: 'c2',
      value: '2',
      title: 'da',
    },
    {
      id: 'c3',
      value: '3',
      title: 'da',
    },
  ];

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
      if (!settings?.timerIsNeeded) setTimeout(() => setTimerIsOver(true), DELAY_WITHOUT_TIMER);
      setTimerIsOver(false);
      dispatch(roundInProgress());
    });
  }, [dispatch, settings?.timerIsNeeded, socket]);

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

      dispatch(gameInProgress());
      setTimerIsOver(false);
      setPlay(false);
      setCurrentId('');
    }
  }, [currentId, currentIssueId, room, socket, timerIsOver, play, user?.role, settings?.masterAsPlayer, dispatch]);

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
      {gameStatus !== 'end-game' ? (
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
              {settings?.timerIsNeeded && (
                <Timer start={play} timerIsOverHandler={timerIsOverHandler} location={location} />
              )}
              {user?.role === 'scram-master' && play ? (
                <Button
                  className="btn btn--small btn--cancel"
                  variant="outlined"
                  onClick={() => {
                    socket?.emit('stopTimer', room);
                  }}
                >
                  Stop Game
                </Button>
              ) : (
                <Button
                  className="btn btn--small btn--cancel"
                  variant="outlined"
                  onClick={() => {
                    if (user?.role === 'scram-master') {
                      dispatch(endGame());
                    } else {
                      console.log('exit');
                    }
                  }}
                >
                  {user?.role === 'scram-master' ? 'Stop Game' : 'Exit'}
                </Button>
              )}
            </Grid>
            {user?.role === 'scram-master' && !play ? (
              <div className="page-game__btn-container">
                <Button
                  className="btn btn--small"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    socket?.emit('startTimer', room);
                  }}
                >
                  Run Round
                </Button>
                <Button className="btn btn--small" variant="contained" color="primary" onClick={handleClickNextIssue}>
                  Next ISSUE
                </Button>
              </div>
            ) : null}
            <IssueList />
            {gameStatus === 'round-in-progress' &&
              (user?.role === 'player' || (user?.role === 'scram-master' && settings?.masterAsPlayer)) &&
              cards && (
                <div className="page-game__cards">
                  <p className="page-game__cards-title">
                    Currently voting on issue {currentIssue.title} is in progress. Choose a card below
                  </p>
                  <CardList gameCards={cards} currentId={currentId} setCurrentId={setCurrentId} />
                </div>
              )}
          </Grid>
          <Grid item xs={12} md={5} lg={4} className="page-game__aside">
            <MemberCardList />
            <Statistics />
          </Grid>
        </Grid>
      ) : (
        <Grid container>
          <div className="page-result">
            <Title title={title} />
            {mockRes.map((res) => (
              <div className="page-result__block">
                <Issue
                  roomId="r1"
                  key={res.issueId}
                  id={res.issueId}
                  title={mockIssues.find((issue) => issue.id === res.issueId)?.title as string}
                  priority={mockIssues.find((issue) => issue.id === res.issueId)?.priority as PriorityEnum}
                  current={mockIssues.find((issue) => issue.id === res.issueId)?.current as boolean}
                  link={mockIssues.find((issue) => issue.id === res.issueId)?.link as string}
                  description={mockIssues.find((issue) => issue.id === res.issueId)?.description as string}
                  isResult
                />
                <Statistics issueId={res.issueId} />
              </div>
            ))}
          </div>
        </Grid>
      )}

      <AcceptUserModal />
      <KickUserModal />
    </Container>
  );
}
