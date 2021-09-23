import { useAppSelector } from '../../store/hooks/hooks';
import { MemberCard } from '../MemberCard/MemberCard';
import './MembersList.scss';

export const MembersList = (): JSX.Element => {
  const users = useAppSelector((state) => state.users.users);
  const members = users.filter((user) => user.role !== 'scram-master');
  return (
    <div className="member-list">
      <h2 className="member-list__title">Members:</h2>
      <div className="member-list__wrapper">
        {members.length > 0 &&
          members.map((item) => (
            <MemberCard src={item.avatar} name={`${item.firstname} ${item.lastname}`} position={item.position} />
          ))}
      </div>
    </div>
  );
};
