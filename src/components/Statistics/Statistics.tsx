import './Statistics.scss';
import { GameCard } from '../GameCard/GameCard';

const gameCards = [
  { id: 35635463, title: 'sp', value: '2', percent: 9.5 },
  { id: 990934, title: 'sp', value: '5', percent: 70 },
  { id: 1234090, title: 'sp', value: '1', percent: 20.5 },
];

export function Statistics(): JSX.Element {
  return (
    <div className="statistics">
      <h2 className="statistics__title">Statistics:</h2>
      <div className="statistics__items">
        {gameCards.map(({ id, title, value, percent }) => {
          return (
            <div className="statistics__item" key={id}>
              <GameCard title={title} value={value} />
              <div className="statistics__percent">{percent}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
