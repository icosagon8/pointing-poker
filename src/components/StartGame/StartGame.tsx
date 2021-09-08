import { Button } from '@material-ui/core';
import { MemberCard } from '../MemberCard/MemberCard';
import './StartGame.scss';

export const StartGame = (): JSX.Element => {
  return (
    <div className="start-game">
      <h4 className="start-game__scram-master">Scram master:</h4>
      <MemberCard src="https://www.meme-arsenal.com/memes/732cac98dc1d07127952687091bf7005.jpg" name="Sung-Jin-Woo" />
      <h3 className="start-game__to-lobby">Link to lobby:</h3>
      <div className="start-game__link-block">
        <input className="start-game__input" value="http://pockerplanning.c..." />
        <Button variant="contained" color="primary" className="start-game__btn start-game__copy">
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
