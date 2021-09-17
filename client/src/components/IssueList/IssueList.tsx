import './IssueList.scss';
import { useState } from 'react';
import IssueCard from '../../models/iIssueCard';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';

interface IssueListType {
  role: string;
  issues: {
    id: number;
    title: string;
    priority: string;
  }[];
}

export function IssueList(props: IssueListType): JSX.Element {
  const [issuesState, setIssuesState] = useState<IssueCard[]>([]);

  const handleSetIssueState = (issues: IssueCard[]) => {
    setIssuesState(issues);
  };

  const { issues, role } = props;
  return (
    <div className="issue-list">
      <h2 className="issue-list__title">Issues:</h2>
      <ul className="issue-list__items">
        {issues.map(({ id, title, priority }) => (
          <li className="issue-list__item" key={id}>
            <Issue title={title} priority={priority} role={role}/>
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
