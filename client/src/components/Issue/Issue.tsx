import './Issue.scss';
import { Card, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import IssueCard from '../../models/iIssueCard';

export function Issue(props: IssueCard): JSX.Element {
  const { title, priority, role, id, setCurrentId, className } = props;

  const handleClick = () => {
    if (role === 'scram-master') {
      setCurrentId(id);
    }
  };

  return (
    <Card className={`issue-card ${className}`} onClick={handleClick}>
      <span className={`issue-card__current-text ${className}`}>current</span>
      <div className="issue-card__main">
        <h3 className="issue-card__title">{title}</h3>
        <IconButton>
          <CloseIcon />
        </IconButton>
      </div>
      <span className="issue-card__priority">{priority}</span>
    </Card>
  );
}
