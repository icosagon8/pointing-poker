import './Issue.scss';
import { Card, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';
import IssueCard from '../../models/iIssueCard';

export function Issue(props: IssueCard): JSX.Element {
  const { title, priority } = props;
  const [current] = useState<boolean>(false);

  return (
    <Card className={current ? 'issue-card issue-card__current' : 'issue-card'}>
      {current && <span className="issue-card__current-text">current</span>}
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
