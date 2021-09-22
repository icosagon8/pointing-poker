import { Button } from '@material-ui/core';
import { useState } from 'react';
import { MemberCard } from '../MemberCard/MemberCard';
import { useAppSelector } from '../../store/hooks/hooks';
import './StartGame.scss';

export const StartGame = (): JSX.Element => {
  const room = useAppSelector((state) => state.room.room);
  const [link] = useState<string>(`http://localhost:3000/lobby_${room}`);

  return (
    <div className="start-game">
      <h4 className="start-game__scram-master">Scram master:</h4>
      <MemberCard name="Sung-Jin-Woo" />
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
        <Button variant="contained" color="primary" className="start-game__btn start-game__copy">
          Start game
        </Button>
        <Button variant="outlined" color="primary" className="start-game__btn start-game__cancel">
          Cancel game
        </Button>
      </div>
    </div>
  );
};
