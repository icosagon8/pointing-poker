import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { SettingsFormInput } from '../../models/SettingsFormInput';
import { AddGameCard } from '../AddGameCard/AddGameCard';
import { Timer } from '../Timer/Timer';
import { Title } from '../Title/Title';
import './SettingsForm.scss';

export const SettingsForm = (): JSX.Element => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormInput>({ criteriaMode: 'all' });

  const onSubmit: SubmitHandler<SettingsFormInput> = (data) => {
    console.log(data);
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
                label={<Typography className="settings-form__label">Changing card in rount end:</Typography>}
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
                label={<Typography className="settings-form__label">Changing card in rount end:</Typography>}
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
        <div className="settings-form__block-timer">
          <Title title="Round time:" />
          <Timer register={register} start={false} />
        </div>
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
