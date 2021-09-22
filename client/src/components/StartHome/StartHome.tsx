import './StartHome.scss';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal/BaseModal';
import { LobbyForm } from '../LobbyForm/LobbyForm';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addRoom } from '../../store/slices/roomSlice';
import { parsePath } from '../../helpers/utils';

interface FormInputs {
  url: string;
}

export function StartHome(): JSX.Element {
  const room = useAppSelector((state) => state.room.room);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [isScram, setIsScram] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  useEffect(() => {
    dispatch(addRoom(''));
  }, [dispatch]);

  const handleOpenStartBtn = () => {
    setOpen(true);
    setIsScram(true);
  };

  const handleOpenConnectBtn = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setIsScram(false);
    dispatch(addRoom(''));
  };

  const onSubmit = (data: FormInputs) => {
    handleOpenConnectBtn();
    dispatch(addRoom(parsePath(data.url)));
  };

  return (
    <section className="start-home">
      <h2 className="start-home__title">Start your planning:</h2>
      <div className="start-home__session-wrapper">
        <span className="start-home__label">Create session:</span>
        <Button className="btn" variant="contained" onClick={handleOpenStartBtn}>
          Start new game
        </Button>
      </div>
      <p className="start-home__divider-text">OR:</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="url" className="start-home__label start-home__label--mb">
          Connect to lobby by <span className="start-home__text">URL</span>:
        </label>
        <div className="start-home__lobby-wrapper">
          <input
            className="start-home__field"
            id="url"
            type="text"
            placeholder="http://pockerplanning.com/1"
            autoComplete="off"
            {...register('url', {
              required: 'This input is required.',
              pattern: {
                value:
                  /https?:\/\/(www\.)?[-a-zA-Z\d@:%._+~#=]{1,256}[.:][a-zA-Z\d()]{1,6}\b([-a-zA-Z\d()@:%_+.~#?&//=]*)/i,
                message: 'This input must match the pattern.',
              },
            })}
          />
          <Button className="btn" variant="contained" type="submit">
            Connect
          </Button>
        </div>
        {errors.url?.type === 'required' && <p className="start-home__error">{errors.url.types.required}</p>}
        {errors.url?.type === 'pattern' && <p className="start-home__error">{errors.url.types.pattern}</p>}
      </form>
      <BaseModal open={open} handleClose={handleClose}>
        <LobbyForm handleClose={handleClose} isScram={isScram} />
      </BaseModal>
    </section>
  );
}
