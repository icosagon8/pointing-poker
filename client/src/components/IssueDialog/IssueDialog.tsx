import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import { useContext, useEffect } from 'react';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';
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
  roomId: string;
}

export const IssueDialog = (props: IissueDialog): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const room = useAppSelector((state) => state.room.room);
  const { onClose, open, issues, setIssueState } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ criteriaMode: 'all' });

  useEffect(() => {
    socket?.on('issues', (issues) => {
      // dispatch(addUsers(users));
    });
  }, [socket]);

  const handleClose = () => {
    onClose();
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    data.roomId = room;
    socket?.emit('saveIssue', data);
    setIssueState([...issues, { id: '123123', title: data.title, priority: data.priority } as IssueCard]);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} className="issue-dialog ">
      <div>
        <h3 className="issue-dialog__title">Create Issue</h3>
      </div>
      <DialogContent>
        <form className="issue-dialog__form" onSubmit={handleSubmit(onSubmit)}>
          <div className="issue-dialog__form__block">
            <div className="issue-dialog__form__input-wrapper">
              <label htmlFor="title" className="issue-dialog__form__label">
                Title:
              </label>
              <input
                id="title"
                className="issue-dialog__form__input"
                {...register('title', {
                  required: 'Enter issue title',
                  maxLength: {
                    value: 30,
                    message: 'Max length is 30',
                  },
                })}
              />
            </div>
            {errors.title?.type === 'maxLength' && (
              <p className="issue-dialog__form__error-text">{errors.title.types?.maxLength}</p>
            )}
            {errors.title?.type === 'required' && (
              <p className="issue-dialog__form__error-text">{errors.title.types?.required}</p>
            )}
          </div>
          <div className="issue-dialog__form__block">
            <div className="issue-dialog__form__input-wrapper">
              <label htmlFor="link" className="issue-dialog__form__label">
                Link:
              </label>
              <input
                id="link"
                className="issue-dialog__form__input"
                {...register('link', {
                  required: 'Enter link',
                  pattern: {
                    value:
                      /https?:\/\/(www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}\.[a-zA-Z\d()]{1,6}\b([-a-zA-Z\d()@:%_+.~#?&//=]*)/i,
                    message: 'This input must match the pattern.',
                  },
                })}
              />
            </div>
            {errors.link?.type === 'pattern' && (
              <p className="issue-dialog__form__error-text">{errors.link?.types?.pattern}</p>
            )}
            {errors.link?.type === 'required' && (
              <p className="issue-dialog__form__error-text">{errors.link?.types?.required}</p>
            )}
          </div>
          <div className="issue-dialog__form__block issue-dialog__form__priority">
            <div className="issue-dialog__form__input-wrapper">
              <label htmlFor="priority" className="issue-dialog__form__label">
                Priotity:
              </label>
              <select id="priority" className="issue-dialog__form__input" {...register('priority')}>
                <option>Low</option>
                <option>Middle</option>
                <option>Hight</option>
              </select>
            </div>
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
