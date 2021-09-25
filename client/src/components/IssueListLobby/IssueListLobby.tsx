import { useAppSelector } from '../../store/hooks/hooks';
import IssueCard from '../../models/iIssueCard';
import { IssueCreate } from '../IssueCreate/IssueCreate';
import { IssueMaster } from '../IssueMaster/IssueMaster';
import { Title } from '../Title/Title';
import './IssueListLobby.scss';

export const IssueListLobby = (): JSX.Element => {
  const issues = useAppSelector((state) => state.issues.issues);

  return (
    <div className="issue-list-lobby">
      <Title title="Issues:" />
      <div className="issue-list-lobby__block">
        {issues.map((item) => {
          return <IssueMaster title={item.title} priority={item.priority} key={item.id} id={item.id} />;
        })}
        <IssueCreate />
      </div>
    </div>
  );
};
