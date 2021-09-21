import './CardList.scss';
import { useState } from 'react';
import { GameCard } from '../GameCard/GameCard';

interface CardListType {
  gameCards: {
    id: string;
    title: string;
    value: string;
  }[];
}

export function CardList(props: CardListType): JSX.Element {
  const { gameCards } = props;
  const [location] = useState<string>('game-page-field');
  const [currentId, setCurrentId] = useState<string>('');

  return (
    <ul className="card-list">
      {gameCards.map(({ id, title, value }) => (
        <li className="card-list__item" key={id}>
          <GameCard
            id={id}
            title={title}
            value={value}
            location={location}
            setCurrentId={setCurrentId}
            className={currentId === id ? 'active' : null}
          />
        </li>
      ))}
    </ul>
  );
}
