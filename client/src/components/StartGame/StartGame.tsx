import { Button } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MemberCard } from '../MemberCard/MemberCard';
import { UserModel } from '../../models/userModel';
import { useAppSelector } from '../../store/hooks/hooks';
import { SocketContext } from '../../socketContext';
import './StartGame.scss';

export const StartGame = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  const room = useAppSelector((state) => state.room.room);
  const link = `https://clever-kirch-c3b9cb.netlify.app/${room}`;
  const users = useAppSelector((state) => state.users.users);
  const scramMaster = users.find((user) => user.role === 'scram-master') as UserModel;
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    socket?.on('redirectToNewGame', () => {
      history.push('/game');
    });
  }, [socket, history]);

  const handleClickCancel = () => {
    socket?.emit('cancelGame', room);
  };

  const handleClickExit = () => {
    socket?.emit('exitUser', room);
  };

  return (
    <div className="start-game">
      <h4 className="start-game__scram-master">Scram master:</h4>
      <MemberCard
        name={scramMaster?.firstname}
        lastname={scramMaster?.lastname}
        src={scramMaster?.avatar}
        position={scramMaster?.position}
        kickButtonDisplay={false}
      />
      {user?.role === 'scram-master' && (
        <>
          <h3 className="start-game__to-lobby">Link to lobby:</h3>
          <div className="start-game__link-container">
            <div className="start-game__link-text-wrapper">
              <p className="start-game__link">{link}</p>
            </div>
            <Button
              variant="contained"
              color="primary"
              className="btn btn--small"
              onClick={() => navigator.clipboard.writeText(link)}
            >
              Copy
            </Button>
          </div>
        </>
      )}
      <div className="start-game__btn-block">
        {user?.role === 'scram-master' ? (
          <>
            <Button form="modalForm" variant="contained" type="submit" className="btn btn--small">
              Start game
            </Button>

            <Button
              variant="outlined"
              color="primary"
              className="btn btn--small btn--cancel"
              onClick={handleClickCancel}
            >
              Cancel game
            </Button>
          </>
        ) : (
          <div className="start-game__btn-block-user ">
            <Button
              variant="outlined"
              color="primary"
              className="start-game__btn start-game__cancel"
              onClick={handleClickExit}
            >
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
