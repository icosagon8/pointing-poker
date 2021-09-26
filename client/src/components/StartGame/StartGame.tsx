import { Button } from '@material-ui/core';
import { MemberCard } from '../MemberCard/MemberCard';
import { UserModel } from '../../models/userModel';
import { useAppSelector } from '../../store/hooks/hooks';
import './StartGame.scss';

export const StartGame = (): JSX.Element => {
  const room = useAppSelector((state) => state.room.room);
  const link = `http://localhost:3000/${room}`;
  const users = useAppSelector((state) => state.users.users);
  const scramMaster = users.find((user) => user.role === 'scram-master') as UserModel;

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
      <div className="start-game__btn-block">
        <Button
          form="modalForm"
          variant="contained"
          type="submit"
          color="primary"
          className="start-game__btn start-game__copy"
        >
          Start game
        </Button>
        <Button variant="outlined" color="primary" className="start-game__btn start-game__cancel">
          Cancel game
        </Button>
      </div>
    </div>
  );
};
