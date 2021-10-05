import { useContext, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Chat } from '../../components/Chat/Chat';
import { GameSettings } from '../../components/GameSettings/GameSettings';
import { IssueList } from '../../components/IssueList/IssueList';
import { MembersList } from '../../components/MembersList/MembersList';
import { StartGame } from '../../components/StartGame/StartGame';
import './LobbyPage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { SocketContext } from '../../socketContext';
import { waitingGame, beforeGameStatusGame } from '../../store/slices/statusGameSlice';
import { deleteUser } from '../../store/slices/userSlice';
import { off } from '../../store/slices/chatSlice';
import { KickUserModal } from '../../components/KickUserModal/KickUserModal';
import { endVoting, startVoting } from '../../store/slices/votingSlice';
import { EditableTitle } from '../../components/EditableTitle/EditableTitle';
import { setTitle } from '../../store/slices/titleSlice';

export const LobbyPage = (): JSX.Element => {
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.user.user);
  const title = useAppSelector((state) => state.title.title);
  const room = useAppSelector((state) => state.room.room);
  const chatOpen = useAppSelector((state) => state.chat.isOpen);

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
    dispatch(waitingGame());
  }, [dispatch]);

  useEffect(() => {
    socket?.on('startVoting', () => {
      dispatch(startVoting());
    });

    socket?.on('endVoting', () => {
      dispatch(endVoting());
    });
  }, [socket, dispatch]);

  useEffect(() => {
    socket?.on('titleSent', (newTitle) => {
      dispatch(setTitle(newTitle));
    });
  }, [dispatch, socket]);

  const handleSave = (newTitle: string) => {
    socket?.emit('titleEdited', newTitle, room);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={7} lg={8} className="lobby-page__info">
          <EditableTitle title={title} onSave={handleSave} editButtonDisplay={user?.role === 'scram-master'} />
          <StartGame />
          <MembersList />
          {user?.role === 'scram-master' && (
            <>
              <IssueList />
              <GameSettings />
            </>
          )}
        </Grid>
        {isOpen && (
          <Grid item xs={12} md={5} lg={4}>
            <Chat />
          </Grid>
        )}
      </Grid>
      <KickUserModal />
    </Container>
  );
};
