import './IssueList.scss';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';

const issues = [
  { title: 'Issue 1', prority: 'Low prority' },
  { title: 'Issue 2', prority: 'High prority' },
  { title: 'Issue 3', prority: 'Low prority' },
];

export function IssueList(): JSX.Element {
  return (
    <div className="issue-list">
      <h2 className="issue-list__title">Issues:</h2>
      <ul className="issue-list__items">
        {issues.map(({ title, prority }) => {
          return (
            <li className="issue-list__item">
              <Issue title={title} prority={prority} />
            </li>
          );
        })}
        <li className="issue-list__item">
          <IssueCreate />
        </li>
      </ul>
    </div>
  );
}
