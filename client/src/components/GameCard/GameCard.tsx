import './GameCard.scss';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useRef, useState } from 'react';
import GameCardType from '../../models/iGameCard';

export const GameCard = (props: GameCardType): JSX.Element => {
  const { id, title, value, cardSelection, lobbyPage, setCurrentId, className, setGameCards, gameCards } = props;
  const [cardNumber, setCardNumber] = useState<string>(value);
  const [edit, setEdit] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(e.target.value);
    if (gameCards !== undefined && setGameCards !== undefined) {
      const newCards = gameCards.map((item) => {
        if (item.id === id) {
          item.value = e.target.value;
        }
        return item;
      });
      setGameCards(newCards);
    }
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
    if (setCurrentId && e.key === 'Enter' && cardSelection) {
      setCurrentId(id);
    }
  };

  const handleClick = () => {
    if (setCurrentId && cardSelection) {
      setCurrentId(id);
    }
  };

  return (
    <div
      className={`game-card ${className}`}
      onClick={handleClick}
      onKeyPress={keyPressHandlerCard}
      role="button"
      tabIndex={0}
    >
      {cardSelection && className ? (
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
        {lobbyPage ? (
          <IconButton className="game-card__btn" onClick={handleFocus}>
            <EditOutlinedIcon />
          </IconButton>
        ) : null}
      </div>
      <span className="game-card__title">{title}</span>
      <div className="game-card__input-box">
        {lobbyPage ? (
          <IconButton className="game-card__btn">
            <DeleteOutlineIcon className="game-card__delete-btn" />
          </IconButton>
        ) : null}
        <div className="game-card__number">{cardNumber}</div>
      </div>
    </div>
  );
};
