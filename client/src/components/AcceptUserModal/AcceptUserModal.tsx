import './AcceptUserModal.scss';
import { useState, useContext, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { BaseModal } from '../BaseModal/BaseModal';
import { SocketContext } from '../../socketContext';

interface NewUserType {
  firstname: string | null;
  lastname: string | null;
  position: string | null;
  role: string | null;
  avatar: string | null;
  room: string | null;
  statusGame: string | null;
}

export const AcceptUserModal = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const [open, setOpen] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<NewUserType>({
    firstname: null,
    lastname: null,
    position: null,
    role: null,
    avatar: null,
    room: null,
    statusGame: null,
  });
  
  useEffect(() => {
    socket?.on('loginRequest', (firstname, lastname, position, role, avatar, room, statusGame) => {
      setOpen(true);
      setNewUser({ firstname, lastname, position, role, avatar, room, statusGame });
    });
  }, [socket]);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const handleYesButton = () => {
    socket?.emit('receiveUser', newUser, true);
    setOpen(false);
  };

  const handleNoButton = () => {
    socket?.emit('receiveUser', newUser, false);
    setOpen(false);
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="accept-user-modal">
        <p className="accept-user-modal__text">
          User&nbsp;
          <span className="accept-user-modal__username">
            {newUser?.firstname} {newUser?.lastname}&nbsp;
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
