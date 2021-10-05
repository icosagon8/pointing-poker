import './Statistics.scss';
import { GameCard } from '../GameCard/GameCard';
import { useAppSelector } from '../../store/hooks/hooks';

export function Statistics(): JSX.Element {
  const cards = useAppSelector((state) => state.settings.settings?.cardsValue);
  const title = useAppSelector((state) => state.settings.settings?.scoreTypeShort);
  const currentIssue = useAppSelector((state) => state.issues.issues.find((issue) => issue.current));
  const results = useAppSelector(
    (state) => state.statistic.statistics.find((stat) => stat.issueId === currentIssue?.id)?.results
  );

  return (
    <div className="statistics">
      <h2 className="statistics__title">Statistics:</h2>
      <ul className="statistics__items">
        {cards?.map((card) => (
          <li className="statistics__item">
            <GameCard title={title} value={card.value} id={card.id} />
            <div className="statistics__percent">
              {results && results.find((res) => res.cardId === card.id)?.percent.toFixed(2)}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
