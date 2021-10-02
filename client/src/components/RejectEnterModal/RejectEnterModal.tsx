import './RejectEnterModal.scss';
import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { BaseModal } from '../BaseModal/BaseModal';
import { SocketContext } from '../../socketContext';

export const RejectEnterModal = (): JSX.Element => {
  const [open, setOpen] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('rejectEnterToGame', () => {
      setOpen(true);
    });
  }, [socket]);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const handleClick = () => {
    setOpen(false);
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="reject-enter-modal">
        <p className="reject-enter-modal__text">The game administrator reject your request.</p>
        <div className="reject-enter-modal__btn-wrapper">
          <Button className="btn btn--small" variant="contained" onClick={handleClick}>
            Ok
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
