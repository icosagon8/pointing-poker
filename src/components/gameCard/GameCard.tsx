import './GameCard.scss';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import { useRef, useState } from 'react';
import GameCardType from '../../models/iGameCard';

export const GameCard = (props: GameCardType): JSX.Element => {
  const { title, value } = props;
  const [numberCard, setNumberCard] = useState<number | string>(value);
  const [edit, setEdit] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumberCard(e.target.value);
  };

  const handleFocus = () => {
    ref.current?.focus();
  };

  const keyPressHandler = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEdit(false);
    }
  };

  return (
    <div className="game-card">
      <div className="game-card__input-box">
        <input
          className={edit ? 'game-card__input game-card__input--edit' : 'game-card__input'}
          readOnly={!edit}
          value={numberCard}
          onChange={handleChange}
          ref={ref}
          onFocus={() => setEdit(true)}
          onBlur={() => setEdit(false)}
          onKeyPress={keyPressHandler}
        />
        {!edit && (
          <IconButton className="game-card__edit-btn" onClick={handleFocus}>
            <EditOutlinedIcon />
          </IconButton>
        )}
      </div>
      <h5 className="game-card__title">{title}</h5>
      <div className="game-card__number">{numberCard}</div>
    </div>
  );
};
