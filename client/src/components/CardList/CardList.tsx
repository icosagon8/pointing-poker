import './CardList.scss';
import { useState } from 'react';
import { GameCard } from '../GameCard/GameCard';

interface CardListType {
  gameCards: {
    id: number;
    title: string;
    value: string;
  }[];
}

export function CardList(props: CardListType): JSX.Element {
  const [location] = useState<string>('game-page-field');

  const { gameCards } = props;
  return (
    <ul className="card-list">
      {gameCards.map(({ id, title, value }) => (
        <li className="card-list__item" key={id}>
          <GameCard title={title} value={value} location={location} />
        </li>
      ))}
    </ul>
  );
}
