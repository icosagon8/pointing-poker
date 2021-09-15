import { GameSettings } from '../../components/GameSettings/GameSettings';
import { IssueListLobby } from '../../components/IssueListLobby/IssueListLobby';
import { MembersList } from '../../components/MembersList/MembersList';
import { StartGame } from '../../components/StartGame/StartGame';
import { Title } from '../../components/Title/Title';
import './LobbyPage.scss';

export const LobbyPage = (): JSX.Element => {
  return (
    <div className="lobby-page">
      <Title title="Spring 23 planning (issues 13, 533, 5623, 3252, 6623, ...)" />
      <StartGame />
      <MembersList data={[]} />
      <IssueListLobby />
      <GameSettings />
    </div>
  );
};
