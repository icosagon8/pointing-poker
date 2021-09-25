import './ScoreCard.scss';

interface ScoreType {
  score?: string;
}

export const ScoreCard = (props: ScoreType): JSX.Element => {
  const { score } = props;
  return <div className="score-card">{score}</div>;
};

ScoreCard.defaultProps = {
  score: 'In progress',
};
