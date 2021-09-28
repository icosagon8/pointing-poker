import { nanoid } from 'nanoid';
import GameCardType from '../../models/iGameCard';
import { AddGameCard } from '../AddGameCard/AddGameCard';
import { GameCard } from '../GameCard/GameCard';
import './GameCardsList.scss';

interface CardListState {
  cards: GameCardType[];
  setGameCards: (arr: GameCardType[]) => void;
  watchShortType: string;
}

export const GameCardsList = (props: CardListState): JSX.Element => {
  const { cards, setGameCards, watchShortType } = props;
  const addCardClickHandler = () => {
    setGameCards([...cards, { id: nanoid(), title: watchShortType, value: '1' }]);
  };

  const onKeyPressHandler = () => {};
  return (
    <div className="cards-list">
      {cards.map((item) => {
        return (
          <GameCard
            id={item.id}
            title={watchShortType}
            setGameCards={setGameCards}
            value={item.value}
            lobbyPage
            gameCards={cards}
          />
        );
      })}
      <div onClick={addCardClickHandler} onKeyPress={onKeyPressHandler} role="presentation">
        <AddGameCard />
      </div>
    </div>
  );
};
