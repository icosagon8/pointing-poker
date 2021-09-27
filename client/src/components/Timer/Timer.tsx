import './Timer.scss';
import { Card } from '@material-ui/core';
import { useState, useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { SettingsFormInput } from '../../models/SettingsFormInput';

interface TimeType {
  start: boolean;
  register?: UseFormRegister<SettingsFormInput>;
  location?: string;
}

export function Timer(props: TimeType): JSX.Element {
  const MIN = '02';
  const SEC = '00';
  const { start, location, register } = props;
  const [count, setCount] = useState<number>(0);

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
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [count, start]);

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
            {...(register && {
              ...register('timerHours', {
                required: 'Enter the time',
                maxLength: {
                  value: 2,
                  message: 'Max length is 2',
                },
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
            {...(register && {
              ...register('timerMinutes', {
                required: 'Enter the time',
                maxLength: {
                  value: 2,
                  message: 'Max length is 2',
                },
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
