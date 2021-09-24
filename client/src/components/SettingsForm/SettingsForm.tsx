import { useContext } from 'react';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SettingsFormInput } from '../../models/SettingsFormInput';
import { AddGameCard } from '../AddGameCard/AddGameCard';
import { Timer } from '../Timer/Timer';
import { Title } from '../Title/Title';
import './SettingsForm.scss';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';

export const SettingsForm = (): JSX.Element => {
  const { socket } = useContext(SocketContext);
  const room = useAppSelector((state) => state.room.room);
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SettingsFormInput>({ criteriaMode: 'all' });
  const watchTimer: boolean = watch('timerIsNeeded');

  const onSubmit: SubmitHandler<SettingsFormInput> = (data) => {
    if (data.timerHours.length === 1) {
      data.timerHours = `0${data.timerHours}`;
    }
    if (data.timerMinutes.length === 1) {
      data.timerMinutes = `0${data.timerMinutes}`;
    }
    data.roomId = room;
    socket?.emit('saveSettings', data);
  };

  return (
    <>
      <form id="modalForm" className="settings-form" onSubmit={handleSubmit(onSubmit)}>
        <>
          <Controller
            name="masterAsPlayer"
            control={control}
            defaultValue
            render={({ field }) => (
              <FormControlLabel
                className="settings-form__block-switch"
                label={<Typography className="settings-form__label">Scram master as player:</Typography>}
                labelPlacement="start"
                control={<Switch {...field} checked={field.value} />}
              />
            )}
          />
        </>
        <>
          <Controller
            name="changingCard"
            control={control}
            defaultValue
            render={({ field }) => (
              <FormControlLabel
                className="settings-form__block-switch"
                label={<Typography className="settings-form__label">Changing card in round end:</Typography>}
                labelPlacement="start"
                control={<Switch {...field} checked={field.value} />}
              />
            )}
          />
        </>
        <>
          <Controller
            name="timerIsNeeded"
            control={control}
            defaultValue
            render={({ field }) => (
              <FormControlLabel
                className="settings-form__block-switch"
                label={<Typography className="settings-form__label">Is timer needed:</Typography>}
                labelPlacement="start"
                control={<Switch {...field} checked={field.value} />}
              />
            )}
          />
        </>
        <div className="settings-form__block">
          <div className="settings-form__input-block">
            <label htmlFor="scoreType" className="settings-form__label">
              Score type:
            </label>
            <input
              id="scoreType"
              className="settings-form__input"
              {...register('scoreType', {
                required: 'Enter score type',
                maxLength: {
                  value: 30,
                  message: 'Max length is 30',
                },
                pattern: {
                  value: /^[\w]*$/m,
                  message: 'This input must match the pattern',
                },
              })}
            />
          </div>
          <>
            {errors.scoreType?.type === 'maxLength' && (
              <p className="settings-form__error-text">{errors.scoreType.types?.maxLength}</p>
            )}
            {errors.scoreType?.type === 'required' && (
              <p className="settings-form__error-text">{errors.scoreType.types?.required}</p>
            )}
            {errors.scoreType?.type === 'pattern' && (
              <p className="settings-form__error-text">{errors.scoreType.types?.pattern}</p>
            )}
          </>
        </div>
        <div className="settings-form__block">
          <div className="settings-form__input-block">
            <label htmlFor="scoreTypeShort" className="settings-form__label">
              Score type(Short):
            </label>
            <input
              id="scoreTypeShort"
              className="settings-form__input"
              {...register('scoreTypeShort', {
                required: 'Enter short score type',
                maxLength: {
                  value: 2,
                  message: 'Max length is 2',
                },
                pattern: {
                  value: /^[\w]*$/m,
                  message: 'This input must match the pattern',
                },
              })}
            />
          </div>
          <>
            {errors.scoreTypeShort?.type === 'maxLength' && (
              <p className="settings-form__error-text">{errors.scoreTypeShort.types?.maxLength}</p>
            )}
            {errors.scoreTypeShort?.type === 'required' && (
              <p className="settings-form__error-text">{errors.scoreTypeShort.types?.required}</p>
            )}
            {errors.scoreTypeShort?.type === 'pattern' && (
              <p className="settings-form__error-text">{errors.scoreTypeShort.types?.pattern}</p>
            )}
          </>
        </div>
        {(watchTimer || watchTimer === undefined) && (
          <div className="settings-form__block">
            <div className="settings-form__input-block">
              <Title title="Round time:" />
              <Timer register={register} start={false} location="lobby-page" />
            </div>
            <>
              {errors.timerHours?.type === 'maxLength' && (
                <p className="settings-form__error-text">{errors.timerHours.types?.maxLength}</p>
              )}
              {errors.timerHours?.type === 'required' && (
                <p className="settings-form__error-text">{errors.timerHours.types?.required}</p>
              )}
              {errors.timerHours?.type === 'pattern' && (
                <p className="settings-form__error-text">{errors.timerHours.types?.pattern}</p>
              )}
              {errors.timerMinutes?.type === 'maxLength' && (
                <p className="settings-form__error-text">{errors.timerMinutes.types?.maxLength}</p>
              )}
              {errors.timerMinutes?.type === 'required' && (
                <p className="settings-form__error-text">{errors.timerMinutes.types?.required}</p>
              )}
              {errors.timerMinutes?.type === 'pattern' && (
                <p className="settings-form__error-text">{errors.timerMinutes.types?.pattern}</p>
              )}
            </>
          </div>
        )}
        <div className="settings-form__block-add-card">
          <Title title="Add card values:" />
          <div>
            <AddGameCard />
          </div>
        </div>
      </form>
    </>
  );
};
