import { useState } from 'react';
import IssueCard from '../../models/iIssueCard';
import { Issue } from '../Issue/Issue';
import { IssueCreate } from '../IssueCreate/IssueCreate';
import { IssueMaster } from '../IssueMaster/IssueMaster';
import { Title } from '../Title/Title';
import './IssueListLobby.scss';

export const IssueListLobby = (): JSX.Element => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [issuesState, setIssuesState] = useState<IssueCard[]>([]);

  const handleSetIssueState = (issues: IssueCard[]) => {
    setIssuesState(issues);
  };

  return (
    <div className="issue-list-lobby">
      <Title title="Issues:" />
      <div className="issue-list-lobby__block">
        {issuesState.map((item: IssueCard) => {
          return <IssueMaster title={item.title} prority={item.prority} />;
        })}
        <IssueCreate issues={issuesState} setIssueState={handleSetIssueState} />
      </div>
    </div>
  );
};
