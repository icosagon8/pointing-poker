import './IssueCreate.scss';
import { Card, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

export function IssueCreate(): JSX.Element {
  return (
    <Card className="issue-create">
      <h3 className="issue-create__title">Create new Issue</h3>
      <IconButton>
        <AddIcon />
      </IconButton>
    </Card>
  );
}
