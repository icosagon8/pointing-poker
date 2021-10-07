import { useContext, useEffect } from 'react';
import './MemberCardList.scss';
import { MemberCard } from '../MemberCard/MemberCard';
import { ScoreCard } from '../ScoreCard/ScoreCard';
import { UserModel } from '../../models/userModel';
import { SocketContext } from '../../socketContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { checkUser, kickMember } from '../../helpers/utils';
import { endVoting, startVoting } from '../../store/slices/votingSlice';

export function MemberCardList(): JSX.Element {
  const { socket } = useContext(SocketContext);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user) as UserModel;
  const currentIssue = useAppSelector((state) => state.issues.issues.find((issue) => issue.current));
  const votes = useAppSelector((state) => state.gameVotes.votes);
  const isVoting = useAppSelector((state) => state.voting.isVoting);
  const users = useAppSelector((state) => state.users.users);
  const settings = useAppSelector((state) => state.settings.settings);
  const players = users.filter(
    (currentUser) => currentUser.role === 'player' || (settings?.masterAsPlayer && currentUser.role === 'scram-master')
  );
  const members = users.filter((currentUser) => currentUser.role !== 'scram-master');

  useEffect(() => {
    const handleStartVoting = () => {
      dispatch(startVoting());
    };

    const handleEndVoting = () => {
      dispatch(endVoting());
    };

    socket?.on('startVoting', handleStartVoting);
    socket?.on('endVoting', handleEndVoting);

    return () => {
      socket?.off('startVoting', handleStartVoting);
      socket?.off('endVoting', handleEndVoting);
    };
  }, [dispatch, socket]);

  return (
    <div className="member-list">
      <div className="member-list__title-box">
        <h2 className="member-list__title">Score:</h2>
        <h2 className="member-list__title">Players:</h2>
      </div>
      <ul className="member-list__items">
        {players.map((member) => (
          <li className="member-list__item" key={member.id}>
            <ScoreCard
              score={
                settings?.cardsValue.find(
                  (card) =>
                    card.id ===
                    votes.find((vote) => {
                      return vote.userId === member.id && vote.issueId === currentIssue?.id;
                    })?.cardId
                )?.value
              }
              title={settings?.scoreTypeShort}
            />
            <MemberCard
              name={member.firstname}
              lastname={member.lastname}
              position={member.position}
              src={member.avatar}
              role={member.role}
              kickButtonDisplay={checkUser(socket, member, members, isVoting)}
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
