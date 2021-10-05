import { useContext, useState } from 'react';
import { FormControlLabel, Switch, Typography } from '@material-ui/core';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { nanoid } from 'nanoid';
import { SettingsFormInput } from '../../models/SettingsFormInput';
import { Timer } from '../Timer/Timer';
import { Title } from '../Title/Title';
import { SocketContext } from '../../socketContext';
import { useAppSelector } from '../../store/hooks/hooks';
import { GameCardsList } from '../GameCardsList/GameCardsList';
import GameCardType from '../../models/iGameCard';
import './SettingsForm.scss';
import { fibonacci, power2 } from '../../helpers/utils';
import { CARDS_NUMBER_IN_SET } from '../../helpers/constants';

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
  const watchTimer: boolean = watch('timerIsNeeded', true);
  const watchShortType: string = watch('scoreTypeShort', '');
  const watchCardSet: string = watch('cardSet', 'Own');
  const [gameCards, setGameCards] = useState<GameCardType[]>([]);

  const getCardValues = (n: number, cb: (n: number) => number) => {
    const numbers: number[] = [];
    let i = 0;

    while (numbers.length < n) {
      const number = cb(i);
      if (!numbers.includes(number)) numbers.push(number);
      i++;
    }

    return numbers;
  };

  const createCardSet = (arr: number[]): GameCardType[] =>
    arr.map((number) => ({ id: nanoid(), value: String(number) }));

  const selectCardSet = () => {
    const cardSet = [];

    if (watchCardSet === 'Fibonacci') {
      const values = getCardValues(CARDS_NUMBER_IN_SET, fibonacci);
      cardSet.push(...createCardSet(values));
    } else if (watchCardSet === 'Powers of 2') {
      const values = getCardValues(CARDS_NUMBER_IN_SET, power2);
      cardSet.push(...createCardSet(values));
    } else {
      cardSet.push(...gameCards.map((item) => ({ id: item.id, value: item.value })));
    }

    return cardSet;
  };

  const onSubmit: SubmitHandler<SettingsFormInput> = (data) => {
    if (data.timerHours.length === 1) {
      data.timerHours = `0${data.timerHours}`;
    }

    if (data.timerMinutes.length === 1) {
      data.timerMinutes = `0${data.timerMinutes}`;
    }

    const cardSet = selectCardSet();
    data.cardsValue = cardSet;
    data.roomId = room;
    socket?.emit('saveSettings', data);
    socket?.emit('startGame', room);
    socket?.emit('statusGame-progress', room);
  };

  return (
    <div className="settings-form-wrapper">
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
            name="admitNewUser"
            control={control}
            defaultValue
            render={({ field }) => (
              <FormControlLabel
                className="settings-form__block-switch"
                label={
                  <Typography className="settings-form__label">
                    Automatically admit all new player, if the game has already started
                  </Typography>
                }
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
              autoComplete="off"
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
              autoComplete="off"
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
        {watchTimer && (
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
        <div className="settings-form__block">
          <div className="settings-form__input-block">
            <label htmlFor="card-set" className="settings-form__label">
              Choose your card set:
            </label>
            <select id="card-set" className="settings-form__input" {...register('cardSet')}>
              <option value="Own">Own</option>
              <option value="Fibonacci">Fibonacci</option>
              <option value="Powers of 2">Powers of 2</option>
            </select>
          </div>
        </div>
      </form>
      {watchCardSet === 'Own' && (
        <div className="settings-form__block-add-card">
          <Title title="Add card values:" />
          <div className="settings-form__block-cards-list">
            <GameCardsList cards={gameCards} watchShortType={watchShortType} setGameCards={setGameCards} />
          </div>
        </div>
      )}
    </div>
  );
};
