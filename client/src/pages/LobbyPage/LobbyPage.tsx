import { Container, Grid } from '@material-ui/core';
import { Chat } from '../../components/Chat/Chat';
import { GameSettings } from '../../components/GameSettings/GameSettings';
import { IssueListLobby } from '../../components/IssueListLobby/IssueListLobby';
import { MembersList } from '../../components/MembersList/MembersList';
import { StartGame } from '../../components/StartGame/StartGame';
import { Title } from '../../components/Title/Title';
import './LobbyPage.scss';
import { useAppSelector } from '../../store/hooks/hooks';

export const LobbyPage = (): JSX.Element => {
  const isOpen = useAppSelector((state) => state.chat.isOpen);
  const user = useAppSelector((state) => state.user.user);
  return (
    <Container>
      <Grid container>
        <Grid item xs={12} md={8} className="lobby-page__info">
          <Title title="Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)" />
          <StartGame />
          <MembersList />
          {user?.role === 'scram-master' && <IssueListLobby />}
          {user?.role === 'scram-master' && <GameSettings />}
        </Grid>
        {isOpen && (
          <Grid item xs={12} md={4}>
            <Chat />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
