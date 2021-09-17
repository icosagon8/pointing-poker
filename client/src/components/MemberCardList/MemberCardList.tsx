import './MemberCardList.scss';
import { MemberCard } from '../MemberCard/MemberCard';
import { ScoreCard } from '../ScoreCard/ScoreCard';

interface MemberCardListType {
  members: {
    id: number;
    name: string;
    position?: string;
    src: string;
  }[];
}

export function MemberCardList(props: MemberCardListType): JSX.Element {
  const { members } = props;
  return (
    <div className="member-list">
      <div className="member-list__title-box">
        <h2 className="member-list__title">Score:</h2>
        <h2 className="member-list__title">Players:</h2>
      </div>
      <ul className="member-list__items">
        {members.map(({ id, name, position, src }) => (
          <li className="member-list__item" key={id}>
            <ScoreCard />
            <MemberCard name={name} position={position} src={src} />
          </li>
        ))}
      </ul>
    </div>
  );
}
