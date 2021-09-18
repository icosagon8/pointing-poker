import './IssueList.scss';
import { useState } from 'react';
import IssueCard from '../../models/iIssueCard';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';

interface IssueListType {
  role: string;
  issues: IssueCard[];
}

export function IssueList(props: IssueListType): JSX.Element {
  const { issues, role } = props;
  const [issuesState, setIssuesState] = useState<IssueCard[]>([]);
  const [currentId, setCurrentId] = useState<number | undefined>(issues[0].id);

  const handleSetIssueState = () => {
    setIssuesState(issues);
  };

  return (
    <div className="issue-list">
      <h2 className="issue-list__title">Issues:</h2>
      <ul className="issue-list__items">
        {issues.map(({ id, title, priority }) => (
          <li className="issue-list__item" key={id}>
            <Issue
              title={title}
              priority={priority}
              role={role}
              id={id}
              setCurrentId={setCurrentId}
              className={currentId === id ? 'active' : null}
            />
          </li>
        ))}
        {role === 'scram-master' ? (
          <li className="issue-list__item">
            <IssueCreate issues={issuesState} setIssueState={handleSetIssueState} />
          </li>
        ) : null}
      </ul>
    </div>
  );
}
