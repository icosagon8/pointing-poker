import { useAppSelector } from '../../store/hooks/hooks';
import { IssueCreate } from '../IssueCreate/IssueCreate';
import { Issue } from '../Issue/Issue';
import { Title } from '../Title/Title';
import { UserModel } from '../../models/userModel';
import './IssueList.scss';

export const IssueList = (): JSX.Element => {
  const issues = useAppSelector((state) => state.issues.issues);
  const user = useAppSelector((state) => state.user.user) as UserModel;

  return (
    <div className="issue-list">
      <Title title="Issues:" />
      <div className="issue-list__block">
        {issues.map((item) => {
          return (
            <Issue
              title={item.title}
              link={item.link}
              priority={item.priority}
              key={item.id}
              id={item.id}
              current={item.current}
              roomId={item.roomId}
              description={item.description}
            />
          );
        })}
        {user?.role === 'scram-master' && <IssueCreate />}
      </div>
    </div>
  );
};
