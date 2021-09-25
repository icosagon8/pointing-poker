import { Button } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MemberCard } from '../MemberCard/MemberCard';
import { UserModel } from '../../models/userModel';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { off } from '../../store/slices/chatSlice';
import { SocketContext } from '../../socketContext';
import './StartGame.scss';

export const StartGame = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { socket } = useContext(SocketContext);
  const history = useHistory();
  const room = useAppSelector((state) => state.room.room);
  const chatOpen = useAppSelector((state) => state.chat.isOpen);
  const link = `http://localhost:3000/${room}`;
  const users = useAppSelector((state) => state.users.users);
  const scramMaster = users.find((user) => user.role === 'scram-master') as UserModel;
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    socket?.on('redirectToNewGame', () => {
      history.push('/game');
    });
    socket?.on('redirectToHomePage', () => {
      if (chatOpen) {
        dispatch(off());
      }
      history.push('/');
    });
  }, [socket, dispatch, history, chatOpen]);

  const handleClick = () => {
    socket?.emit('cancelGame', room);
  };

  return (
    <div className="start-game">
      <h4 className="start-game__scram-master">Scram master:</h4>
      <MemberCard
        name={scramMaster?.firstname}
        lastname={scramMaster?.lastname}
        src={scramMaster?.avatar}
        position={scramMaster?.position}
      />
      {user?.role === 'scram-master' && (
        <>
          <h3 className="start-game__to-lobby">Link to lobby:</h3>
          <div className="start-game__link-block">
            <p className="start-game__link">{link}</p>
            <Button
              variant="contained"
              color="primary"
              className="start-game__btn start-game__copy"
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
            <Button
              form="modalForm"
              variant="contained"
              type="submit"
              color="primary"
              className="start-game__btn start-game__copy"
            >
              Start game
            </Button>

            <Button variant="outlined" color="primary" className="start-game__btn start-game__cancel" onClick={handleClick}>
              Cancel game
            </Button>
          </>
        ) : (
          <div className="start-game__btn-block-user ">
            <Button variant="outlined" color="primary" className="start-game__btn start-game__cancel">
              Exit
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
