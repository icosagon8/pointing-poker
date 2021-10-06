import './Statistics.scss';
import { GameCard } from '../GameCard/GameCard';
import { useAppSelector } from '../../store/hooks/hooks';

interface StatisticState {
  issueId?: string;
}

export function Statistics(props: StatisticState): JSX.Element {
  const { issueId } = props;
  const cards = useAppSelector((state) => state.settings.settings?.cardsValue);
  const title = useAppSelector((state) => state.settings.settings?.scoreTypeShort);
  const currentIssue = useAppSelector((state) => state.issues.issues.find((issue) => issue.current));
  const status = useAppSelector((state) => state.statusGame.statusGame);
  const results = useAppSelector(
    (state) => state.statistic.statistics.find((stat) => stat.issueId === currentIssue?.id)?.results
  );

  const endResults = useAppSelector(
    (state) => state.statistic.statistics.find((stat) => stat.issueId === issueId)?.results
  );

  return (
    <div className="statistics">
      {status !== 'end-game' && <h2 className="statistics__title">Statistics:</h2>}
      <ul className={status !== 'end-game' ? 'statistics__items' : 'statistics__results'}>
        {cards &&
          cards.map((card) => (
            <li className="statistics__item" key={card.id}>
              <GameCard title={title} value={card.value} id={card.id} />
              <div className="statistics__percent">
                {results && !endResults && results.find((res) => res.cardId === card.id)?.percent.toFixed(1)}
                {endResults && endResults.find((res) => res.cardId === card.id)?.percent.toFixed(1)}%
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
