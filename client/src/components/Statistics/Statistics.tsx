import './Statistics.scss';
import { GameCard } from '../GameCard/GameCard';
import { useAppSelector } from '../../store/hooks/hooks';
import { PriorityEnum } from '../../models/issueModel';

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

  const mockRes = [
    {
      issueId: '1',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
    {
      issueId: '2',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
    {
      issueId: '3',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
    {
      issueId: '4',
      results: [
        {
          cardId: 'c1',
          percent: 60,
        },
        {
          cardId: 'c2',
          percent: 40,
        },
        {
          cardId: 'c3',
          percent: 0,
        },
      ],
    },
  ];

  const mockIssues = [
    {
      id: '1',
      title: 'first',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: false,
    },
    {
      id: '2',
      title: 'second',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: false,
    },
    {
      id: '3',
      title: 'third',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: false,
    },
    {
      id: '4',
      title: 'forth',
      priority: PriorityEnum.low,
      roomId: 'r1',
      current: true,
    },
  ];

  const mockCards = [
    {
      id: 'c1',
      value: '1',
      title: 'da',
    },
    {
      id: 'c2',
      value: '2',
      title: 'da',
    },
    {
      id: 'c3',
      value: '3',
      title: 'da',
    },
  ];

  const mockResults = mockRes.find((res) => res.issueId === issueId)?.results;

  return (
    <div className="statistics">
      {status !== 'end-game' && <h2 className="statistics__title">Statistics:</h2>}
      <ul className={status !== 'end-game' ? 'statistics__items' : 'statistics__results'}>
        {mockCards.map((card) => (
          <li className="statistics__item" key={card.id}>
            <GameCard title={title} value={card.value} id={card.id} />
            <div className="statistics__percent">
              {results && results.find((res) => res.cardId === card.id)?.percent.toFixed(2)}
              {mockResults && mockResults.find((res) => res.cardId === card.id)?.percent.toFixed(2)}%
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
