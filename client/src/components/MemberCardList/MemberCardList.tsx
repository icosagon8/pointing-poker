import { useContext } from 'react';
import './MemberCardList.scss';
import { MemberCard } from '../MemberCard/MemberCard';
import { ScoreCard } from '../ScoreCard/ScoreCard';
import { useAppSelector } from '../../store/hooks/hooks';
import { SocketContext } from '../../socketContext';

export function MemberCardList(): JSX.Element {
  const users = useAppSelector((state) => state.users.users);
  const votes = useAppSelector((state) => state.gameVotes.votes);
  const settings = useAppSelector((state) => state.settings.settings);
  const currentIssue = useAppSelector((state) => state.issues.issues.find((issue) => issue.current));

  return (
    <div className="member-list">
      <div className="member-list__title-box">
        <h2 className="member-list__title">Score:</h2>
        <h2 className="member-list__title">Players:</h2>
      </div>
      <ul className="member-list__items">
        {users.map((user) => (
          <li className="member-list__item" key={user.id}>
            <ScoreCard
              score={
                settings?.cardsValue.find(
                  (card) =>
                    card.id ===
                    votes.find((vote) => vote.userId === user.id && vote.issueId === currentIssue?.id)?.cardId
                )?.value
              }
              title={settings?.scoreTypeShort}
            />
            <MemberCard name={user.firstname} lastname={user.lastname} position={user.position} src={user.avatar} />
          </li>
        ))}
      </ul>
    </div>
  );
}
