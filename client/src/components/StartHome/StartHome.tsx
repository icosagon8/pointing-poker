import './StartHome.scss';
import { Button } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { BaseModal } from '../BaseModal/BaseModal';
import { LobbyForm } from '../LobbyForm/LobbyForm';
import { useAppDispatch } from '../../store/hooks/hooks';
import { addRoom } from '../../store/slices/roomSlice';
import { parsePath } from '../../helpers/utils';
import { SocketContext } from '../../socketContext';

interface FormInputs {
  url: string;
}

export function StartHome(): JSX.Element {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState<boolean>(false);
  const [isScram, setIsScram] = useState<boolean>(false);
  const { socket } = useContext(SocketContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  useEffect(() => {
    dispatch(addRoom(''));
  }, [dispatch]);

  useEffect(() => {
    socket?.on('room', (room) => {
      if (room) {
        setOpen(true);
      } else {
        setError('url', {
          types: {
            exist: 'There is no such room',
          },
        });
        dispatch(addRoom(''));
      }
    });
  }, [socket, setError, dispatch]);

  const handleOpenStartBtn = () => {
    setOpen(true);
    setIsScram(true);
  };

  const handleOpenConnectBtn = (room: string) => {
    socket?.emit('joinRoom', room);
  };

  const handleClose = () => {
    setOpen(false);
    setIsScram(false);
    dispatch(addRoom(''));
  };

  const onSubmit = (data: FormInputs) => {
    const room = parsePath(data.url);
    handleOpenConnectBtn(room);
    dispatch(addRoom(room));
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
        {errors.url?.types.exist && <p className="start-home__error">{errors.url.types.exist}</p>}
      </form>
      <BaseModal open={open} handleClose={handleClose}>
        <LobbyForm handleClose={handleClose} isScram={isScram} />
      </BaseModal>
    </section>
  );
}
