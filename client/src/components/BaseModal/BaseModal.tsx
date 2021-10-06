import './BaseModal.scss';
import { Modal } from '@material-ui/core';

interface Props {
  open: boolean;
  handleClose: (event: React.MouseEvent | React.KeyboardEvent, reason?: string) => void;
  children: JSX.Element;
  className?: string;
}

export function BaseModal(props: Props): JSX.Element {
  const { open, handleClose, children, className } = props;

  return (
    <Modal className="modal-overlay" open={open} onClose={handleClose}>
      <div className={`modal${className !== undefined ? ` ${className}` : ''}`}>{children}</div>
    </Modal>
  );
}
