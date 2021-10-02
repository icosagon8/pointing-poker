import './WaitingModal.scss';
import { useState, useContext, useEffect } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { BaseModal } from '../BaseModal/BaseModal';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';

export const WaitingModal = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);
  const room = useAppSelector((state) => state.room.room);

  useEffect(() => {
    socket?.on('waitingEnterGame', () => {
      setOpen(true);
    });
    socket?.on('rejectEnterToGame', () => {
      setOpen(false);
    });
  }, [socket]);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const handleClick = () => {
    socket?.emit('waitingEnterGameCancel', room);
    setOpen(false);
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="waiting-modal">
        <p className="waiting-modal__text">Your request is being reviewed by the game administrator</p>
        <p className="waiting-modal__text waiting-modal__text--loading">
          please wait ... <CircularProgress />
        </p>
        <div className="waiting-modal__btn-wrapper">
          <Button className="btn btn--small btn--cancel" variant="outlined" color="primary" onClick={handleClick}>
            Cancel
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
