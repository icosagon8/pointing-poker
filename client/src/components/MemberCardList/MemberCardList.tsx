import './MemberCardList.scss';
import { useContext } from 'react';
import { MemberCard } from '../MemberCard/MemberCard';
import { ScoreCard } from '../ScoreCard/ScoreCard';
import { UserModel } from '../../models/userModel';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';
import { checkUser, kickMember } from '../../helpers/utils';

export function MemberCardList(): JSX.Element {
  const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.user.user) as UserModel;
  const isVoting = useAppSelector((state) => state.voting.isVoting);
  const users = useAppSelector((state) => state.users.users);
  const settings = useAppSelector((state) => state.settings.settings);
  const players = settings?.masterAsPlayer ? users : users.filter((currentUser) => currentUser.role !== 'scram-master');

  return (
    <div className="member-list">
      <div className="member-list__title-box">
        <h2 className="member-list__title">Score:</h2>
        <h2 className="member-list__title">Players:</h2>
      </div>
      <ul className="member-list__items">
        {players.map((member) => (
          <li className="member-list__item" key={member.id}>
            <ScoreCard />
            <MemberCard
              name={member.firstname}
              lastname={member.lastname}
              position={member.position}
              src={member.avatar}
              kickButtonDisplay={checkUser(socket, member, players, isVoting)}
              onKick={() => {
                kickMember(socket, member, user);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
