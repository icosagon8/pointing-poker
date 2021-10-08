/* eslint-disable indent */
import { useHistory } from 'react-router-dom';
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
import {
  beforeGameStatusGame,
  endGame,
  gameInProgress,
  roundInProgress,
  getStatusGame,
} from '../../store/slices/statusGameSlice';
import { UserModel } from '../../models/userModel';
import { addVote } from '../../store/slices/gameVoteSlice';
import { addStatistic } from '../../store/slices/statisticSlice';
import { KickUserModal } from '../../components/KickUserModal/KickUserModal';
import { DELAY_WITHOUT_TIMER } from '../../helpers/constants';
import { Issue } from '../../components/Issue/Issue';
import { IssueModel } from '../../models/issueModel';
import { deleteUser } from '../../store/slices/userSlice';
import { off } from '../../store/slices/chatSlice';
import { ExportXLSX } from '../../components/ExportXLSX/ExportXLSX';
import { Chat } from '../../components/Chat/Chat';

export function GamePage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const [play, setPlay] = useState<boolean>(false);
  const [location] = useState<string>('game-page');
  const gameStatus = useAppSelector((state) => state.statusGame.statusGame);
  const users = useAppSelector((state) => state.users.users);
  const user = useAppSelector((state) => state.user.user);
  const room = useAppSelector((state) => state.room.room);
  const issues = useAppSelector((state) => state.issues.issues);
  const scramMaster = users.find((item) => item.role === 'scram-master') as UserModel;
  const title = useAppSelector((state) => state.title.title);
  const [timerIsOver, setTimerIsOver] = useState<boolean>(false);
  const settings = useAppSelector((state) => state.settings.settings);
  const [currentId, setCurrentId] = useState<string>('');
  const results = useAppSelector((state) => state.statistic.statistics);
  const history = useHistory();
  const chatOpen = useAppSelector((state) => state.chat.isOpen);
  const currentIssue = useAppSelector((state) => state.issues.issues.find((issue) => issue.current)) as IssueModel;
  const currentIssueId = currentIssue?.id;
  const cards = settings?.cardsValue.map((card) => {
    return {
      ...card,
      title: settings.scoreTypeShort,
    };
  });
  const xlsxData: unknown[] = [];
  if (gameStatus === 'end-game') {
    issues.forEach((issue) => {
      const result = results.find((res) => res.issueId === issue.id)?.results;
      cards?.forEach((card) => {
        xlsxData.push({
          issueTitle: issue.title,
          issuePriority: issue.priority,
          cardValue: card.value,
          cardTitle: card.title,
          percent: result?.find((res) => res.cardId === card.id)?.percent,
        });
      });
    });
  }

  useEffect(() => {
    socket?.on('getStatusGame', (statusGame) => {
      dispatch(getStatusGame(statusGame));
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('logout', () => {
      if (chatOpen) {
        dispatch(off());
      }
      dispatch(beforeGameStatusGame());
      dispatch(deleteUser());
      history.push('/');
      socket?.disconnect();
    });
  }, [socket, history, dispatch, chatOpen]);

  useEffect(() => {
    socket?.on('getStatistic', (result) => {
      dispatch(addStatistic(result));
    });

    socket?.on('stopTimerUsers', () => {
      setPlay(false);
      setTimerIsOver(true);
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
    <main className="page page-home app__main">
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
                    Stop Round
                  </Button>
                ) : (
                  <Button
                    className="btn btn--small btn--cancel"
                    variant="outlined"
                    onClick={() => {
                      if (user?.role === 'scram-master') {
                        dispatch(endGame());
                        socket?.emit('statusGame-end', room);
                      } else {
                        socket?.emit('exitUser', room);
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
                      socket?.emit('startTimer', room, users.length);
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
                      Currently voting on issue {currentIssue?.title} is in progress. Choose a card below
                    </p>
                    <CardList gameCards={cards} currentId={currentId} setCurrentId={setCurrentId} />
                  </div>
                )}
            </Grid>
            <Grid item xs={12} md={5} lg={4} className="page-game__aside">
              {chatOpen ? (
                <Chat />
              ) : (
                <>
                  <MemberCardList />
                  <Statistics />
                </>
              )}
            </Grid>
          </Grid>
        ) : (
          <Grid container className="page-result">
            <Title title={title} />
            {results.length ? (
              <div className="page-result__wrapper">
                <div className="page-result__results">
                  {results.map((res) => {
                    const issue = issues.find((item) => item.id === res.issueId) as IssueModel;

                    return (
                      <div className="page-result__block" key={res.issueId}>
                        <Issue
                          roomId={room}
                          key={res.issueId}
                          id={res.issueId}
                          title={issue.title}
                          priority={issue.priority}
                          current={issue.current}
                          link={issue.link}
                          description={issue.description}
                          score={issue.score}
                        />
                        <Statistics issueId={res.issueId} />
                      </div>
                    );
                  })}
                </div>
                <ExportXLSX fileName="game_results" xlsxData={xlsxData} />
              </div>
            ) : (
              <p className="page-result__text-absence">You have not solved a single issue</p>
            )}
          </Grid>
        )}
        <AcceptUserModal />
        <KickUserModal />
      </Container>
    </main>
  );
}
