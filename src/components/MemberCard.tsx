import './MemberCard.scss';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { IconButton } from '@material-ui/core';
import MemberCardType from '../models/iMemberCard';

export const MemberCard = (props: MemberCardType): JSX.Element => {
  const { src, name, position } = props;
  return (
    <div className="member-card-item__block">
      <img src={src} alt="avatar" className="member-card-item__image" />
      <div>
        <h2 className="member-card-item__title">{name}</h2>
        <h4 className="member-cerd-item__position">{position}</h4>
      </div>
      <IconButton>
        <NotInterestedIcon />
      </IconButton>
    </div>
  );
};
