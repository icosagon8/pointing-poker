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
import { addIssues } from '../../store/slices/issuesSlice';
import { SocketContext } from '../../socketContext';
import { saveSettings } from '../../store/slices/settingsSlice';
import { UserModel } from '../../models/userModel';
import { deleteUser } from '../../store/slices/userSlice';
import { Message } from '../../models/Message';
import { KickUserModal } from '../../components/KickUserModal/KickUserModal';
import { endVoting, startVoting } from '../../store/slices/votingSlice';
import { EditableTitle } from '../../components/EditableTitle/EditableTitle';
import { setTitle } from '../../store/slices/titleSlice';

export const LobbyPage = (): JSX.Element => {
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const isVoting = useAppSelector((state) => state.voting.isVoting);
  const user = useAppSelector((state) => state.user.user);
  const users = useAppSelector((state) => state.users.users);
  const members = users.filter((member) => member.role !== 'scram-master');
  const title = useAppSelector((state) => state.title.title);
  const room = useAppSelector((state) => state.room.room);
  const MAX_MEMBERS = 3;

  useEffect(() => {
    socket?.on('logout', () => {
      dispatch(deleteUser());
      history.push('/');
      socket?.disconnect();
    });
  }, [socket, history, dispatch]);

  useEffect(() => {
    socket?.on('issues', (issues) => {
      dispatch(addIssues(issues));
    });
    socket?.on('sendSettings', (item) => {
      dispatch(saveSettings(item));
    });
  }, [socket, dispatch]);

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

  const kickMember = (kicked: UserModel | Message, userAgainst: UserModel) => {
    socket?.emit('kickMember', kicked, userAgainst);
  };

  const checkUser = (member: UserModel | Message): boolean => {
    return !(
      socket?.id === member.id ||
      member.role === 'scram-master' ||
      members.length <= MAX_MEMBERS ||
      members.findIndex((item) => item.id === member.id) === -1 ||
      isVoting
    );
  };

  const handleSave = (newTitle: string) => {
    socket?.emit('titleEdited', newTitle, room);
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8} className="lobby-page__info">
          <EditableTitle title={title} onSave={handleSave} editButtonDisplay={user?.role === 'scram-master'} />
          <StartGame />
          <MembersList kickMember={kickMember} checkUser={checkUser} />
          {user?.role === 'scram-master' && (
            <>
              <IssueList />
              <GameSettings />
            </>
          )}
        </Grid>
        {isOpen && (
          <Grid item xs={12} md={4}>
            <Chat kickMember={kickMember} checkUser={checkUser} />
          </Grid>
        )}
      </Grid>
      <KickUserModal />
    </Container>
  );
};
