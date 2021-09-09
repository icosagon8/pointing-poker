import './IssueList.scss';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';

interface IssueListType {
  issues: {
    key: number;
    title: string;
    prority: string;
  }[];
}

export function IssueList(props: IssueListType): JSX.Element {
  const { issues } = props;
  return (
    <div className="issue-list">
      <h2 className="issue-list__title">Issues:</h2>
      <ul className="issue-list__items">
        {issues.map(({ key, title, prority }) => {
          return (
            <li className="issue-list__item" key={key}>
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
