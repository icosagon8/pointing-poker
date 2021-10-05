import './ScoreCard.scss';

interface ScoreType {
  score?: string;
  title?: string;
}

export const ScoreCard = (props: ScoreType): JSX.Element => {
  const { score, title } = props;
  return <div className="score-card">{score !== 'In progress' ? `${score} ${title}` : score}</div>;
};

ScoreCard.defaultProps = {
  score: 'In progress',
  title: '',
};
