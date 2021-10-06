import './Issue.scss';
import { useState, useContext } from 'react';
import EditIcon from '@material-ui/icons/Edit';
import { Card, IconButton } from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { useLocation } from 'react-router-dom';
import { IssueDialog } from '../IssueDialog/IssueDialog';
import { IssueModel } from '../../models/issueModel';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';

export const Issue = (props: IssueModel): JSX.Element => {
  const { title, priority, id, current, roomId } = props;
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { socket } = useContext(SocketContext);
  const user = useAppSelector((state) => state.user.user);
  const status = useAppSelector((state) => state.statusGame.statusGame);

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

  return (
    <Card
      className={current && status !== 'end-game' && location.pathname === '/game' ? 'issue active' : 'issue'}
      onClick={handleClickCard}
    >
      <div className="issue__text">
        {current && location.pathname === '/game' && status !== 'end-game' && (
          <span className="issue__text-current">current</span>
        )}
        <h3 className="issue__text-title">{title}</h3>
        <p className="issue__text-priority">{priority}</p>
      </div>
      {user?.role === 'scram-master' && status !== 'end-game' && (
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
    </Card>
  );
};
