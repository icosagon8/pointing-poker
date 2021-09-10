import './CardList.scss';
import { GameCard } from '../GameCard/GameCard';

const gameCards = [
  { id: 35635463, title: 'sp', value: '2' },
  { id: 990934, title: 'sp', value: '5' },
  { id: 1234090, title: 'sp', value: '1' },
];

export function CardList(): JSX.Element {
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
