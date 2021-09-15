import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { SubmitHandler, useForm } from 'react-hook-form';
import IssueCard from '../../models/iIssueCard';
import './IssueDialog.scss';

interface IissueDialog {
  open: boolean;
  onClose: () => void;
  issues: IssueCard[];
  setIssueState: (issues: IssueCard[]) => void;
}

enum PriorityEnum {
  low = 'low',
  middle = 'middle',
  hight = 'hight',
}

interface IFormInput {
  title: string;
  link: string;
  priority: PriorityEnum;
}

export const IssueDialog = (props: IissueDialog): JSX.Element => {
  const { onClose, open, issues, setIssueState } = props;
  const { register, handleSubmit } = useForm<IFormInput>();

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setIssueState([...issues, { title: data.title, prority: data.priority } as IssueCard]);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="issue-dialog">
      <div>
        <h3 className="issue-dialog__title">Create Issue</h3>
      </div>
      <DialogContent>
        <form className="issue-dialog__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="issue-dialog__form__block">
            <label htmlFor="title" className="issue-dialog__form__label">
              Title:
            </label>
            <input id="title" className="issue-dialog__form__input" {...register('title')} />
          </div>
          <div className="issue-dialog__form__block">
            <label htmlFor="link" className="issue-dialog__form__label">
              Link:
            </label>
            <input id="link" className="issue-dialog__form__input" {...register('link')} />
          </div>
          <div className="issue-dialog__form__block issue-dialog__form__priority">
            <label htmlFor="priority" className="issue-dialog__form__label">
              Priotity:
            </label>
            <select id="priority" className="issue-dialog__form__input" {...register('priority')}>
              <option>Low</option>
              <option>Middle</option>
              <option>Hight</option>
            </select>
          </div>
          <DialogActions className="issue-dialog__buttons">
            <button type="submit" className="issue-dialog__btn issue-dialog__yes">
              Yes
            </button>
            <Button
              onClick={handleClose}
              variant="outlined"
              color="primary"
              className="issue-dialog__btn issue-dialog__no"
            >
              No
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};
