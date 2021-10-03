import './MemberCard.scss';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { Avatar, IconButton } from '@material-ui/core';
import MemberCardType from '../../models/iMemberCard';
import { getInitials } from '../../helpers/utils';

export const MemberCard = (props: MemberCardType): JSX.Element => {
  const { src, name, lastname, position, role, onKick, kickButtonDisplay: propsKickButtonDisplay } = props;
  const kickButtonDisplay = propsKickButtonDisplay === undefined ? true : propsKickButtonDisplay;

  const getAvatarClassNames = (playerRole?: string): string => {
    let modifier: string;

    switch (playerRole) {
      case 'scram-master':
        modifier = ' member-card__avatar--scram';
        break;
      case 'player':
        modifier = ' member-card__avatar--player';
        break;
      default:
        modifier = '';
        break;
    }

    return `member-card__avatar${modifier}`;
  };

  return (
    <div className="member-card">
      <div className="member-card__user">
        <Avatar className={getAvatarClassNames(role)} src={src} alt="avatar" title={role}>
          {getInitials(name, lastname)}
        </Avatar>
        <div className="member-card__info">
          <h3 className="member-card__title">
            {name} {lastname}
          </h3>
          {position && <h4 className="member-card__position">{position}</h4>}
        </div>
      </div>
      {kickButtonDisplay && (
        <IconButton onClick={onKick}>
          <NotInterestedIcon />
        </IconButton>
      )}
    </div>
  );
};
