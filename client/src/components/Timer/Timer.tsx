import './Timer.scss';
import { Card } from '@material-ui/core';
import { useState, useEffect } from 'react';

interface TimeType {
  start: boolean;
  location: string;
}

export function Timer(props: TimeType): JSX.Element {
  const { start, location } = props;
  const [min, setMin] = useState<string>('02');
  const [sec, setSec] = useState<string>('00');
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
    const minString = Number(min);
    const secString = Number(sec);
    setCount(minString * 60 + secString);
  }, [start, min, sec]);

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

  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3 && e.target.value.match(/^\d+$/)) {
      setMin(e.target.value);
    }
  };

  const handleChangeSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length < 3 && e.target.value.match(/^\d+$/)) {
      setSec(e.target.value);
    }
  };

  return (
    <Card className="timer">
      <div className="timer__titles">
        <div className="timer__titles-minutes">minutes</div>
        <div className="timer__titles-seconds">seconds</div>
      </div>
      {location === 'lobby-page' ? (
        <div className="timer__edit">
          <input className="timer__edit-input" type="text" value={min} onChange={handleChangeMin} max={2} />
          <span className="timer__edit-dots">:</span>
          <input className="timer__edit-input" type="text" value={sec} onChange={handleChangeSec} />
        </div>
      ) : (
        <div className="timer__counter">{start ? convertToFormat(count) : `${min}:${sec}`}</div>
      )}
    </Card>
  );
}
