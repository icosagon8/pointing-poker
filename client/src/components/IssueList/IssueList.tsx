import './IssueList.scss';
import { useState } from 'react';
import IssueCard from '../../models/iIssueCard';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';

interface IssueListType {
  role: string;
  issues: IssueCard[];
  currentId: number | undefined;
  setCurrentId: (currentId: number | undefined) => void;
}

export function IssueList(props: IssueListType): JSX.Element {
  const { issues, role, currentId, setCurrentId } = props;
  const [issuesState, setIssuesState] = useState<IssueCard[]>([]);

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
