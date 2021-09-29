import { UserModel } from '../../models/userModel';
import { useAppSelector } from '../../store/hooks/hooks';
import { MemberCard } from '../MemberCard/MemberCard';
import './MembersList.scss';

interface Props {
  kickMember: (kicked: UserModel, userAgainst: UserModel) => void;
  checkUser: (member: UserModel) => boolean;
}

export const MembersList = (props: Props): JSX.Element => {
  const { kickMember, checkUser } = props;
  const users = useAppSelector((state) => state.users.users);
  const members = users.filter((currentUser) => currentUser.role !== 'scram-master');
  const user = useAppSelector((state) => state.user.user) as UserModel;

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
              kickButtonDisplay={checkUser(member)}
              onKick={() => {
                kickMember(member, user);
              }}
            />
          ))}
      </div>
    </div>
  );
};
