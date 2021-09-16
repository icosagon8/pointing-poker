import './MemberCard.scss';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { IconButton } from '@material-ui/core';
import MemberCardType from '../../models/iMemberCard';

export const MemberCard = (props: MemberCardType): JSX.Element => {
  const { src, name, position, isReduced } = props;
  return (
    <div className={isReduced ? 'member-card member-card-reduced' : 'member-card'}>
      {src ? (
        <img
          src={src}
          alt="avatar"
          className={isReduced ? 'member-card__avatar member-card-reduced__avatar' : 'member-card__avatar'}
        />
      ) : (
        <div
          className={
            isReduced
              ? 'member-card__avatar member-card__avatar--initials member-card-reduced__avatar'
              : 'member-card__avatar member-card__avatar--initials'
          }
        />
      )}
      <div>
        <h3 className={isReduced ? 'member-card__title member-card-reduced__title' : 'member-card__title'}>{name}</h3>
        {position && (
          <h4 className={isReduced ? 'member-card__position member-card-reduced__position' : 'member-card__position'}>
            {position}
          </h4>
        )}
      </div>
      <IconButton>
        <NotInterestedIcon />
      </IconButton>
    </div>
  );
};
