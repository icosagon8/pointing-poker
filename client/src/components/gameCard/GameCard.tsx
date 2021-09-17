import './GameCard.scss';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useRef, useState } from 'react';
import GameCardType from '../../models/iGameCard';

export const GameCard = (props: GameCardType): JSX.Element => {
  const { title, value, location } = props;
  const [cardNumber, setCardNumber] = useState<string>(value);
  const [edit, setEdit] = useState<boolean>(false);
  const [selected, setSelected] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
  };

  const handleFocus = () => {
    ref.current?.focus();
  };

  const keyPressHandlerInput = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEdit(false);
    }
  };

  const keyPressHandlerCard = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setSelected((prev) => !prev);
    }
  };

  return (
    <div
      className={location === 'game-page-field' && selected ? 'game-card game-card--selected' : 'game-card'}
      onClick={() => setSelected((prev) => !prev)}
      onKeyPress={keyPressHandlerCard}
      role="radio"
      aria-checked={false}
      tabIndex={0}
    >
      {location === 'game-page-field' && selected ? (
        <>
          <span className="game-card__selected-bg" />
          <CheckCircleIcon className="game-card__selected-icon" fontSize="large" />
        </>
      ) : null}
      <div className="game-card__input-box">
        <input
          className={edit ? 'game-card__input game-card__input--edit' : 'game-card__input'}
          readOnly={!edit}
          value={cardNumber}
          onChange={handleChange}
          ref={ref}
          onFocus={() => setEdit(true)}
          onBlur={() => setEdit(false)}
          onKeyPress={keyPressHandlerInput}
          tabIndex={-1}
        />
        {location === 'lobby-page' ? (
          <IconButton className="game-card__btn" onClick={handleFocus}>
            <EditOutlinedIcon />
          </IconButton>
        ) : null}
      </div>
      <span className="game-card__title">{title}</span>
      <div className="game-card__input-box">
        {location === 'lobby-page' ? (
          <IconButton className="game-card__btn">
            <DeleteOutlineIcon className="game-card__delete-btn" />
          </IconButton>
        ) : null}
        <div className="game-card__number">{cardNumber}</div>
      </div>
    </div>
  );
};
