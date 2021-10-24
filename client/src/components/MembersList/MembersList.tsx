import { useContext } from 'react';
import { checkUser, kickMember } from '../../helpers/utils';
import { UserModel } from '../../models/userModel';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';
import { MemberCard } from '../MemberCard/MemberCard';
import './MembersList.scss';

export const MembersList = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const users = useAppSelector((state) => state.users.users);
  const members = users.filter((currentUser) => currentUser.role !== 'scram-master');
  const user = useAppSelector((state) => state.user.user) as UserModel;
  const isVoting = useAppSelector((state) => state.voting.isVoting);

  return (
    <div className="members-list">
      <h2 className="members-list__title">Members:</h2>
      <div className="members-list__wrapper">
        {members.length > 0 &&
          members.map((member) => (
            <MemberCard
              key={member.id}
              src={member.avatar}
              name={member.firstname}
              lastname={member.lastname}
              position={member.position}
              kickButtonDisplay={checkUser(socket, member, members, isVoting)}
              onKick={() => {
                kickMember(socket, member, user);
              }}
            />
          ))}
      </div>
    </div>
  );
};
