import './Issue.scss';
import { useState, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Card, IconButton, Popover, Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useLocation } from 'react-router-dom';
import { IssueDialog } from '../IssueDialog/IssueDialog';
import { IssueModel } from '../../models/issueModel';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    popover: {
      pointerEvents: 'none',
    },
    paper: {
      padding: theme.spacing(1),
    },
  })
);

export const Issue = (props: IssueModel): JSX.Element => {
  const classes = useStyles();
  const { title, link, priority, id, current, roomId } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.user.user);

  const handleClickCard = () => {
    if (user?.role === 'scram-master' && location.pathname === '/game') {
      socket?.emit('setCurrentIssue', id, roomId);
    }
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    socket?.emit('deleteIssue', id, roomId);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      className={current && location.pathname === '/game' ? 'issue active' : 'issue'}
      onClick={handleClickCard}
      aria-owns={openPopover ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <div className="issue__text">
        {current && location.pathname === '/game' && <span className="issue__text-current">current</span>}
        <h3 className="issue__text-title">{title}</h3>
        <p className="issue__text-priority">{priority}</p>
      </div>
      {user?.role === 'scram-master' && (
        <>
          <div>
            <IconButton className="issue__edit-btn" onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete}>
              <DeleteOutlineIcon className="issue__delete-btn" />
            </IconButton>
          </div>
          <IssueDialog edit id={id} open={open} onClose={handleClose} />
        </>
      )}
      <a className="issue__link" href={link} target="_blank" rel="noreferrer" onClick={handleClickLink}>
        link on issue more details
      </a>
      <Popover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={openPopover}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>I use Popover.</Typography>
      </Popover>
    </Card>
  );
};
