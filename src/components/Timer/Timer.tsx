import './Timer.scss';
import { Card } from '@material-ui/core';
import { useState, useEffect } from 'react';

interface TimeType {
  time: number;
  start: boolean;
}

export function Timer(props: TimeType): JSX.Element {
  const { time, start } = props;
  const [count, setCount] = useState<number>(time);

  const getZero = (num: number) => {
    return String(num).length === 1 ? `0${num}` : `${num}`;
  };

  const convertToFormat = (num: number) => {
    const min = Math.floor(num / 60);
    const sec = num % 60;
    return `${getZero(min)}:${getZero(sec)}`;
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (count > 0) {
      timer = setTimeout(() => setCount((prev) => prev - 1), 1000);
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [count]);

  return (
    <Card className="timer">
      <div className="timer__title">
        <span className="timer__title-min">minutes</span>
        <span className="timer__title-sec">seconds</span>
      </div>
      <div className="timer__counter">{start ? convertToFormat(count) : '00:00'}</div>
    </Card>
  );
}
