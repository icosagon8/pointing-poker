import './Issue.scss';
import { useState, useContext, useEffect } from 'react';
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
  const [valueScore, setValueScore] = useState<string>('-');
  const { title, link, priority, id, current, roomId, description, isResult } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopover = Boolean(anchorEl);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.user.user);
  const room = useAppSelector((state) => state.room.room);
  const scoreTypeShort = useAppSelector((state) => state.settings.settings?.scoreTypeShort);
  const status = useAppSelector((state) => state.statusGame.statusGame);

  useEffect(() => {
    socket?.on('scoreIssue', (scoreIssue) => {
      setValueScore(scoreIssue);
    });
  }, [socket]);

  const handleClickCard = () => {
    if (user?.role === 'scram-master' && location.pathname === '/game') {
      socket?.emit('setCurrentIssue', id, roomId);
    }
  };

  const handleClickDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    socket?.emit('deleteIssue', id, roomId);
  };

  const handleClickLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation();
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

  const handleChangeScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueScore(e.target.value);
    socket?.emit('setScoreIssue', id, e.target.value, room);
  };

  const handleClickScore = (e: React.MouseEvent<HTMLInputElement>) => {
    e.stopPropagation();
  };

  return (
    <Card
      className={current && status !== 'end-game' && location.pathname === '/game' ? 'issue active' : 'issue'}
      onClick={handleClickCard}
      aria-owns={openPopover ? 'mouse-over-popover' : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}

    >
      <div className="issue__text">
        {current && location.pathname === '/game' && status !== 'end-game' && (
          <span className="issue__text-current">current</span>
        )}
        <h3 className="issue__text-title">{title}</h3>
        <p className="issue__text-priority">{priority}</p>
      </div>
      <div className="issue__box-score">
        {user?.role === 'scram-master' && status !== 'end-game' && (
          <>
            <IconButton className="issue__edit-btn" onClick={handleClickOpen}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete}>
              <DeleteOutlineIcon className="issue__delete-btn" />
            </IconButton>
            <IssueDialog edit id={id} open={open} onClose={handleClose} />
          </>
        )}
        <div className="issue__score">
          {user?.role === 'scram-master' ? (
            <label className="issue__score-label" htmlFor="score">
              Score:
              <input
                className="issue__score-input"
                name="score"
                type="text"
                value={valueScore}
                onChange={handleChangeScore}
                onClick={handleClickScore}
              />
            </label>
          ) : (
            <p className="issue__score-text">
              <span className="issue__score-title">Score:</span>
              {valueScore !== '-' ? `${valueScore} ${scoreTypeShort}` : '-'}
            </p>
          )}
        </div>
      </div>
      <a className="issue__link" href={link} target="_blank" rel="noreferrer" onClick={handleClickLink}>
        link on issue {`>`}
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
        disableAutoFocus
        disableEnforceFocus
      >
        <Typography>{description}</Typography>
      </Popover>
    </Card>
  );
};
