import './MemberCard.scss';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Avatar, IconButton } from '@material-ui/core';
import MemberCardType from '../../models/iMemberCard';
import { getInitials } from '../../helpers/utils';

export const MemberCard = (props: MemberCardType): JSX.Element => {
  const { src, name, lastname, position } = props;
  return (
    <div className="member-card">
      <Avatar className="member-card__avatar" src={src} alt="avatar">
        {getInitials(name, lastname)}
      </Avatar>
      <div>
        <h3 className="member-card__title">
          {name} {lastname}
        </h3>
        {position && <h4 className="member-card__position">{position}</h4>}
      </div>
      <IconButton>
        <NotInterestedIcon />
      </IconButton>
    </div>
  );
};
