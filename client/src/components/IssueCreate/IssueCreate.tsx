import './IssueCreate.scss';
import { Card, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { IssueDialog } from '../IssueDialog/IssueDialog';
import IssueCard from '../../models/iIssueCard';

interface IissueCreate {
  issues: IssueCard[];
  setIssueState: (issues: IssueCard[]) => void;
}

export function IssueCreate(props: IissueCreate): JSX.Element {
  const [open, setOpen] = useState(false);
  const { issues, setIssueState } = props;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className="issue-create">
      <h3 className="issue-create__title">Create new Issue</h3>
      <IconButton onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <IssueDialog issues={issues} setIssueState={setIssueState} open={open} onClose={handleClose} />
    </Card>
  );
}
