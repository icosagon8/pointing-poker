import GameCardType from '../../models/iGameCard';
import { AddGameCard } from '../AddGameCard/AddGameCard';
import { GameCard } from '../GameCard/GameCard';
import './GameCardsList.scss';

interface CardListState {
  cards: GameCardType[];
  setGameCards: (arr: GameCardType[]) => void;
}

export const GameCardsList = (props: CardListState): JSX.Element => {
  const { cards, setGameCards } = props;
  const addCardClickHandler = () => {
    setGameCards([...cards, { id: '1', title: 'sp', value: '1' }]);
  };

  const onKeyPressHandler = () => {};
  return (
    <div className="cards-list">
      {cards.map((item) => {
        return <GameCard id={item.id} title={item.title} value={item.value} lobbyPage />;
      })}
      <div onClick={addCardClickHandler} onKeyPress={onKeyPressHandler} role="presentation">
        <AddGameCard />
      </div>
    </div>
  );
};
