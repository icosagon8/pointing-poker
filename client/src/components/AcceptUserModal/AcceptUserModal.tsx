import './AcceptUserModal.scss';
import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { BaseModal } from '../BaseModal/BaseModal';
import { SocketContext } from '../../socketContext';

interface RequestedUserType {
  id: string;
  firstname: string;
  lastname: string;
  room: string;
}

export const AcceptUserModal = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const [open, setOpen] = useState<boolean>(false);
  const [requestedUser, setRequestedUser] = useState<RequestedUserType>({
    id: '',
    firstname: '',
    lastname: '',
    room: '',
  });

  useEffect(() => {
    socket?.on('loginRequest', (id, firstname, lastname, room) => {
      setOpen(true);
      setRequestedUser({ id, firstname, lastname, room });
    });
    socket?.on('loginRequestCancel', () => {
      setOpen(false);
    });
  }, [socket]);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const handleYesButton = () => {
    socket?.emit('receiveUser', requestedUser, true);
    setOpen(false);
  };

  const handleNoButton = () => {
    socket?.emit('receiveUser', requestedUser, false);
    setOpen(false);
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="accept-user-modal">
        <p className="accept-user-modal__text">
          User&nbsp;
          <span className="accept-user-modal__username">
            {requestedUser?.firstname} {requestedUser?.lastname}&nbsp;
          </span>
          want to join. Resolve?
        </p>
        <div className="accept-user-modal__btn-wrapper">
          <Button className="btn btn--small" variant="contained" onClick={handleYesButton}>
            Yes
          </Button>
          <Button className="btn btn--small btn--cancel" variant="outlined" color="primary" onClick={handleNoButton}>
            No
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
