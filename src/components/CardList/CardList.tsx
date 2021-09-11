import './CardList.scss';
import { GameCard } from '../GameCard/GameCard';

interface CardListType {
  gameCards: {
    id: number;
    title: string;
    value: string;
  }[];
}

export function CardList(props: CardListType): JSX.Element {
  const { gameCards } = props;
  return (
    <div className="card-list">
      <div className="card-list__items">
        {gameCards.map(({ id, title, value }) => {
          return (
            <div className="card-list__item" key={id}>
              <GameCard title={title} value={value} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
