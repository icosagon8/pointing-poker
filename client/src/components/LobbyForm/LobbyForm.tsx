import './LobbyForm.scss';
import { Avatar, Button, FormControlLabel, Switch } from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { FileInput } from '../FileInput/FileInput';
import { WaitingModal } from '../WaitingModal/WaitingModal';
import { getInitials } from '../../helpers/utils';
import { SocketContext } from '../../socketContext';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { addUser } from '../../store/slices/userSlice';
import { addRoom } from '../../store/slices/roomSlice';
import { addUsers } from '../../store/slices/usersSlice';
import { setTitle } from '../../store/slices/titleSlice';
import { addIssues } from '../../store/slices/issuesSlice';
import { saveSettings } from '../../store/slices/settingsSlice';

interface Props {
  isScram: boolean;
  handleClose: () => void;
}

interface FormInputs {
  firstname: string;
  lastname: string;
  position: string;
  role: string;
  avatar: string;
}

export function LobbyForm(props: Props): JSX.Element {
  const room = useAppSelector((state) => state.room.room);
  const statusGame = useAppSelector((state) => state.statusGame.statusGame);
  const dispatch = useAppDispatch();
  const { handleClose, isScram } = props;
  const [src, setSrc] = useState<string>('');
  const history = useHistory();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket?.on('users', (users) => {
      dispatch(addUsers(users));
    });

    socket?.on('title', (title) => {
      if (title) dispatch(setTitle(title));
    });

    socket?.on('issues', (issues) => {
      if (issues) dispatch(addIssues(issues));
    });

    socket?.on('sendSettings', (item) => {
      if (item) dispatch(saveSettings(item));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    socket?.on('redirectToGame', () => {
      history.push('/game');
    });
    socket?.on('rejectEnterToGame', () => {
      handleClose();
    });
  }, [dispatch, socket, history, handleClose]);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    criteriaMode: 'all',
  });

  const watchName: string = watch('firstname');
  const watchLastname: string = watch('lastname');

  const getId = (chatRoom: string) => {
    let id: string;

    if (!chatRoom) {
      id = nanoid();
      dispatch(addRoom(id));
    } else {
      id = chatRoom;
    }

    return id;
  };

  const onSubmit = (data: FormInputs) => {
    dispatch(addUser(data));
    const id = getId(room);

    socket?.emit('login', { ...data, room: id, statusGame }, () => {
      history.push('/lobby');
    });
  };

  return (
    <form className="lobby-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="lobby-form__title-wrapper">
        <h2 className="lobby-form__title">Connect to lobby</h2>
        {!isScram ? (
          <Controller
            name="role"
            control={control}
            defaultValue="player"
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    {...field}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      const value = e.target.value === 'observer' ? 'player' : 'observer';
                      field.onChange(value);
                    }}
                    checked={field.value === 'observer'}
                  />
                }
                label="Connect as Observer"
                labelPlacement="start"
              />
            )}
          />
        ) : (
          <input type="hidden" value="scram-master" {...register('role')} />
        )}
      </div>
      <div className="lobby-form__fields-wrapper">
        <div className="lobby-form__group">
          <label className="lobby-form__label" htmlFor="firstname">
            Your first name:
          </label>
          <div className="lobby-form__field-wrapper">
            <input
              className="lobby-form__field"
              id="firstname"
              type="text"
              autoComplete="off"
              {...register('firstname', {
                required: 'Enter your name',
                pattern: {
                  value: /(?!^[\d ]+$)^[^!@#$%*()_—+=|:;"'`<>,.?/^]+$/i,
                  message: 'This input must match the pattern',
                },
                maxLength: {
                  value: 30,
                  message: 'Max length is 30',
                },
              })}
            />
            {errors.firstname?.type === 'required' && (
              <p className="lobby-form__error">{errors.firstname.types.required}</p>
            )}
            {errors.firstname?.type === 'pattern' && (
              <p className="lobby-form__error">{errors.firstname.types.pattern}</p>
            )}
            {errors.firstname?.type === 'maxLength' && (
              <p className="lobby-form__error">{errors.firstname.types.maxLength}</p>
            )}
          </div>
        </div>
        <div className="lobby-form__group">
          <label className="lobby-form__label" htmlFor="lastname">
            Your last name:
          </label>
          <div className="lobby-form__field-wrapper">
            <input
              className="lobby-form__field"
              id="lastname"
              type="text"
              autoComplete="off"
              {...register('lastname', {
                pattern: {
                  value: /(?!^[\d ]+$)^[^!@#$%*()_—+=|:;"'`<>,.?/^]+$/i,
                  message: 'This input must match the pattern',
                },
                maxLength: {
                  value: 30,
                  message: 'Max length is 30',
                },
              })}
            />
            {errors.lastname?.type === 'pattern' && (
              <p className="lobby-form__error">{errors.lastname.types.pattern}</p>
            )}
            {errors.lastname?.type === 'maxLength' && (
              <p className="lobby-form__error">{errors.lastname.types.maxLength}</p>
            )}
          </div>
        </div>
        <div className="lobby-form__group">
          <label className="lobby-form__label" htmlFor="position">
            Your job position:
          </label>
          <div className="lobby-form__field-wrapper">
            <input
              className="lobby-form__field"
              id="position"
              type="text"
              autoComplete="off"
              {...register('position', {
                pattern: {
                  value: /(?!^[\d ]+$)^[^!@#$%*()_—+=|:;"'`<>,.?/^]+$/i,
                  message: 'This input must match the pattern',
                },
              })}
            />
            {errors.position?.type === 'pattern' && (
              <p className="lobby-form__error">{errors.position.types.pattern}</p>
            )}
          </div>
        </div>
        <FileInput setSrc={setSrc} control={control} />
        <Avatar className="lobby-form__avatar" src={src}>
          {getInitials(watchName, watchLastname)}
        </Avatar>
      </div>
      <div className="lobby-form__btn-wrapper">
        <Button className="btn btn--small" variant="contained" type="submit">
          Confirm
        </Button>
        <Button className="btn btn--small btn--cancel" variant="outlined" color="primary" onClick={handleClose}>
          Cancel
        </Button>
      </div>
      <WaitingModal />
    </form>
  );
}
