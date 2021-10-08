import './Issue.scss';
import { useState, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Card, IconButton, Popper } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useLocation } from 'react-router-dom';
import { IssueDialog } from '../IssueDialog/IssueDialog';
import { IssueModel } from '../../models/issueModel';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';

export const Issue = (props: IssueModel): JSX.Element => {
  const { title, link, priority, id, current, roomId, description } = props;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopper = Boolean(anchorEl);
  const idPopper = openPopper ? 'simple-popper' : undefined;
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.user.user);
  const scoreTypeShort = useAppSelector((state) => state.settings.settings?.scoreTypeShort);
  const status = useAppSelector((state) => state.statusGame.statusGame);
  const issues = useAppSelector((state) => state.issues.issues);
  const issueCurrent = issues.find((item) => item.id === id) as IssueModel;

  const handleClickCard = () => {
    if (user?.role === 'scram-master' && location.pathname === '/game' && !open) {
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

  const handleClickOpen = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlehoverPopperOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handlehoverPopperClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      className={current && status !== 'end-game' && location.pathname === '/game' ? 'issue issue--active' : 'issue'}
      onClick={handleClickCard}
      aria-describedby={idPopper}
      onMouseEnter={handlehoverPopperOpen}
      onMouseLeave={handlehoverPopperClose}
    >
      {location.pathname === '/game' && (
        <div className="issue__header">
          {current && status !== 'end-game' && <span className="issue__text-current">current</span>}
          <p className="issue__score-text">
            Score:&nbsp;
            <span className="issue__score">
              {issueCurrent.score !== '' ? `${issueCurrent.score} ${scoreTypeShort}` : '-'}
            </span>
          </p>
        </div>
      )}
      <div className="issue__main">
        <h3 className="issue__title">{title}</h3>
        {user?.role === 'scram-master' && status !== 'end-game' && (
          <div className="issue__btn-container">
            <IconButton className="issue__edit-btn" onClick={handleClickOpen} size="small">
              <EditIcon />
            </IconButton>
            <IconButton className="issue__delete-btn" onClick={handleClickDelete} size="small">
              <DeleteOutlineIcon />
            </IconButton>
            <IssueDialog edit id={id} open={open} onClose={handleClose} />
          </div>
        )}
      </div>
      <div className="issue__footer">
        <span className="issue__text-priority">{priority}</span>
        {link && (
          <a className="issue__link" href={link} target="_blank" rel="noreferrer" onClick={handleClickLink}>
            link on issue {`>`}
          </a>
        )}
      </div>
      {description && (
        <Popper id={idPopper} open={openPopper} anchorEl={anchorEl} placement="top-start">
          <div className="issue__popper-text">{description}</div>
        </Popper>
      )}
    </Card>
  );
};
