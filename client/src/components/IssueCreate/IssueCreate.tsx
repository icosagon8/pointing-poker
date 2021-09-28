import './IssueCreate.scss';
import { Card, IconButton } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useState } from 'react';
import { IssueDialog } from '../IssueDialog/IssueDialog';

export function IssueCreate(): JSX.Element {
  const [open, setOpen] = useState(false);

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
      <IssueDialog open={open} onClose={handleClose} />
    </Card>
  );
}
