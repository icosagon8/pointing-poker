import './KickUserModal.scss';
import { Button } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { UserModel } from '../../models/userModel';
import { SocketContext } from '../../socketContext';
import { BaseModal } from '../BaseModal/BaseModal';

export const KickUserModal = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const [sender, setSender] = useState<UserModel | null>(null);
  const [kickedUser, setKickUser] = useState<UserModel | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleShowModal = (kicked: UserModel, userAgainst: UserModel) => {
    setSender(userAgainst);
    setKickUser(kicked);
    setOpen(true);
  };

  useEffect(() => {
    socket?.on('showModal', handleShowModal);

    return () => {
      socket?.off('showModal', handleShowModal);
    };
  }, [socket]);

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent, reason?: string) => {
    if (reason !== 'backdropClick' && reason !== 'escapeKeyDown') {
      setOpen(false);
    }
  };

  const handleYesButton = () => {
    socket?.emit('vote', true, kickedUser);
    setOpen(false);
  };

  const handleNoButton = () => {
    socket?.emit('vote', false, kickedUser);
    setOpen(false);
  };

  return (
    <BaseModal open={open} handleClose={handleClose}>
      <div className="kick-user-modal">
        <h2 className="kick-user-modal__title">Kick</h2>
        <p className="kick-user-modal__text">
          <span className="kick-user-modal__username">
            {sender?.firstname} {sender?.lastname}&nbsp;
          </span>
          want to kick member
          <span className="kick-user-modal__username">
            &nbsp;{kickedUser?.firstname} {kickedUser?.lastname}
          </span>
          . Do you agree with it?
        </p>
        <div className="kick-user-modal__btn-wrapper">
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
