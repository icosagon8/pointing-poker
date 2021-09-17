import './Statistics.scss';
import { useState } from 'react';
import { GameCard } from '../GameCard/GameCard';

interface StatisticsType {
  gameCardsStat: {
    id: number;
    title: string;
    value: string;
    percent: number;
  }[];
}

export function Statistics(props: StatisticsType): JSX.Element {
  const [location, setLocation] = useState<string>('game-page');

  const { gameCardsStat } = props;
  return (
    <div className="statistics">
      <h2 className="statistics__title">Statistics:</h2>
      <ul className="statistics__items">
        {gameCardsStat.map(({ id, title, value, percent }) => (
          <li className="statistics__item" key={id}>
            <GameCard title={title} value={value} location={location} />
            <div className="statistics__percent">{percent}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
