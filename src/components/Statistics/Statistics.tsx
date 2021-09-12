import './Statistics.scss';
import { GameCard } from '../GameCard/GameCard';

interface StatisticsType {
  gameCards: {
    id: number;
    title: string;
    value: string;
    percent: number;
  }[];
}

export function Statistics(props: StatisticsType): JSX.Element {
  const { gameCards } = props;
  return (
    <div className="statistics">
      <h2 className="statistics__title">Statistics:</h2>
      <ul className="statistics__items">
        {gameCards.map(({ id, title, value, percent }) => (
          <li className="statistics__item" key={id}>
            <GameCard title={title} value={value} />
            <div className="statistics__percent">{percent}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
