import './Timer.scss';
import { Card } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SettingsFormInput } from '../../models/SettingsFormInput';
import { useAppSelector } from '../../store/hooks/hooks';

interface TimeType {
  start: boolean;
  register?: UseFormRegister<SettingsFormInput>;
  location?: string;
  timerIsOverHandler?: () => void;
}

export function Timer(props: TimeType): JSX.Element {
  const settings = useAppSelector((state) => state.settings.settings);
  const MIN = settings?.timerHours;
  const SEC = settings?.timerMinutes;
  const { start, location, register, timerIsOverHandler } = props;
  const [count, setCount] = useState<number>(1);

  const getZero = (num: number) => {
    return String(num).length === 1 ? `0${num}` : `${num}`;
  };

  const convertToFormat = (num: number) => {
    const minutes = Math.floor(num / 60);
    const seconds = num % 60;
    return `${getZero(minutes)}:${getZero(seconds)}`;
  };

  useEffect(() => {
    const minString = Number(MIN);
    const secString = Number(SEC);
    setCount(minString * 60 + secString);
  }, [start, MIN, SEC]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (count > 0 && start) {
      timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    }
    if (count === 0 && timerIsOverHandler) timerIsOverHandler();
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [count, start, timerIsOverHandler]);

  return (
    <Card className="timer">
      <div className="timer__titles">
        <div className="timer__titles-minutes">minutes</div>
        <div className="timer__titles-seconds">seconds</div>
      </div>
      {location === 'lobby-page' ? (
        <div className="timer__edit">
          <input
            className="timer__edit-input"
            type="text"
            autoComplete="off"
            maxLength={2}
            {...(register && {
              ...register('timerHours', {
                required: 'Enter the time',
                pattern: {
                  value: /^[\d]*$/m,
                  message: 'This input must match the pattern',
                },
              }),
            })}
          />
          <span className="timer__edit-dots">:</span>
          <input
            className="timer__edit-input"
            type="text"
            autoComplete="off"
            maxLength={2}
            {...(register && {
              ...register('timerMinutes', {
                required: 'Enter the time',
                pattern: {
                  value: /^[\d]*$/m,
                  message: 'This input must match the pattern',
                },
              }),
            })}
          />
        </div>
      ) : (
        <div className="timer__counter">{start ? convertToFormat(count) : `${MIN}:${SEC}`}</div>
      )}
    </Card>
  );
}

Timer.defaultProps = {
  register: undefined,
  location: '',
};
