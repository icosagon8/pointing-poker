import './IssueList.scss';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';

interface IssueListType {
  issues: {
    id: number;
    title: string;
    priority: string;
  }[];
}

export function IssueList(props: IssueListType): JSX.Element {
  const { issues } = props;
  return (
    <div className="issue-list">
      <h2 className="issue-list__title">Issues:</h2>
      <ul className="issue-list__items">
        {issues.map(({ id, title, priority }) => (
          <li className="issue-list__item" key={id}>
            <Issue title={title} priority={priority} />
          </li>
        ))}
        <li className="issue-list__item">
          <IssueCreate />
        </li>
      </ul>
    </div>
  );
}
