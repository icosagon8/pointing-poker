import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import './IssueDialog.scss';

interface IissueDialog {
  open: boolean;
  onClose: () => void;
}

export const IssueDialog = (props: IissueDialog): JSX.Element => {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="issue-dialog">
      <div>
        <h3 className="issue-dialog__title">Create Issue</h3>
      </div>
      <DialogContent>
        <form className="issue-dialog__form">
          <div className="issue-dialog__form__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="title" className="issue-dialog__form__label">
              Title:
            </label>
            <input id="title" className="issue-dialog__form__input" />
          </div>
          <div className="issue-dialog__form__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="link" className="issue-dialog__form__label">
              Link:
            </label>
            <input id="link" className="issue-dialog__form__input" />
          </div>
          <div className="issue-dialog__form__block">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="priority" className="issue-dialog__form__label">
              Priotity:
            </label>
            <select id="priority" className="issue-dialog__form__input">
              <option>Low</option>
              <option>Middle</option>
              <option>Hight</option>
            </select>
          </div>
        </form>
      </DialogContent>
      <DialogActions className="issue-dialog__buttons">
        <Button
          onClick={handleClose}
          variant="contained"
          color="primary"
          className="issue-dialog__btn issue-dialog__yes"
        >
          Yes
        </Button>
        <Button onClick={handleClose} variant="outlined" color="primary" className="issue-dialog__btn issue-dialog__no">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
