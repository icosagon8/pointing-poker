import MemberCardType from '../../models/iMemberCard';
import { MemberCard } from '../MemberCard/MemberCard';
import './MembersList.scss';

interface ImemberList {
  data: MemberCardType[];
}

export const MembersList = (props: ImemberList): JSX.Element => {
  const { data } = props;
  return (
    <div className="member-list">
      <h2 className="member-list__title">Members:</h2>
      <div className="member-list__wrapper">
        {data.length > 0 && data.map((item) => <MemberCard isReduced={false} src={item.src} name={item.name} />)}
      </div>
    </div>
  );
};
