import { Button } from '@material-ui/core';
import { ChangeEvent, useState } from 'react';
import { useAppSelector } from '../../store/hooks/hooks';
import { MemberCard } from '../MemberCard/MemberCard';
import './StartGame.scss';

export const StartGame = (): JSX.Element => {
  const [linkValue, setLinkValue] = useState<string>('http://pockerplanning.c...');
  const scram = useAppSelector((state) => state.users.users.find((user) => user.role === 'scram-master'));

  return (
    <div className="start-game">
      <h4 className="start-game__scram-master">Scram master:</h4>
      <MemberCard name={`${scram?.firstname} ${scram?.lastname}`} position={scram?.position} src={scram?.avatar} />
      <h3 className="start-game__to-lobby">Link to lobby:</h3>
      <div className="start-game__link-block">
        <input
          className="start-game__input"
          value={linkValue}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            setLinkValue(event.target.value);
          }}
        />
        <Button
          variant="contained"
          color="primary"
          className="start-game__btn start-game__copy"
          onClick={() => navigator.clipboard.writeText(linkValue)}
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
