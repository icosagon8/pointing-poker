import './ScoreCard.scss';

interface ScoreType {
  score?: string;
  title?: string;
}

export const ScoreCard = (props: ScoreType): JSX.Element => {
  const { score, title } = props;
  if (score) {
    return <div className="score-card">{`${score} ${title}`}</div>;
  }
  return <div className="score-card">{`${score}`}</div>;
};

ScoreCard.defaultProps = {
  score: 'In progress',
  title: '',
};
