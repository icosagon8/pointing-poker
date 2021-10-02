import './CardList.scss';
import { useState } from 'react';
import { GameCard } from '../GameCard/GameCard';

interface CardListType {
  gameCards: {
    id: string;
    title: string;
    value: string;
  }[];
  currentId?: string;
  setCurrentId?: (flag: string) => void;
}

export function CardList(props: CardListType): JSX.Element {
  const { gameCards, currentId, setCurrentId } = props;

  return (
    <ul className="card-list">
      {gameCards.map(({ id, title, value }) => (
        <li className="card-list__item" key={id}>
          <GameCard
            id={id}
            title={title}
            value={value}
            cardSelection
            setCurrentId={setCurrentId}
            className={currentId === id ? 'active' : null}
          />
        </li>
      ))}
    </ul>
  );
}
