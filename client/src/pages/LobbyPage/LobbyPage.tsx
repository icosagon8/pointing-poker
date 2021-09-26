import { useContext, useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Chat } from '../../components/Chat/Chat';
import { GameSettings } from '../../components/GameSettings/GameSettings';
import { IssueListLobby } from '../../components/IssueListLobby/IssueListLobby';
import { MembersList } from '../../components/MembersList/MembersList';
import { StartGame } from '../../components/StartGame/StartGame';
import { Title } from '../../components/Title/Title';
import './LobbyPage.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { SocketContext } from '../../socketContext';
import { UserModel } from '../../models/userModel';
import { deleteUser } from '../../store/slices/userSlice';
import { Message } from '../../models/Message';
import { KickUserModal } from '../../components/KickUserModal/KickUserModal';

export const LobbyPage = (): JSX.Element => {
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { socket } = useContext(SocketContext);
  const users = useAppSelector((state) => state.users.users);
  const members = users.filter((user) => user.role !== 'scram-master');
  const MAX_MEMBERS = 3;

  useEffect(() => {
    socket?.on('logout', () => {
      dispatch(deleteUser());
      history.push('/');
    });
  }, [socket, history, dispatch]);

  const kickMember = (kicked: UserModel | Message, userAgainst: UserModel) => {
    socket?.emit('kickMember', kicked, userAgainst);
  };

  const checkUser = (member: UserModel | Message): boolean => {
    return !(
      socket?.id === member.id ||
      member.role === 'scram-master' ||
      members.length <= MAX_MEMBERS ||
      members.findIndex((item) => item.id === member.id) === -1
    );
  };

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8} className="lobby-page__info">
          <Title title="Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)" />
          <StartGame />
          <MembersList kickMember={kickMember} checkUser={checkUser} />
          <IssueListLobby />
          <GameSettings />
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
