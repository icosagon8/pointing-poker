import './Timer.scss';
import { Card } from '@material-ui/core';
import { useState, useEffect, useRef } from 'react';

interface TimeType {
  start: boolean;
}

export function Timer(props: TimeType): JSX.Element {
  const { start } = props;
  const [min, setMin] = useState<string>('00');
  const [sec, setSec] = useState<string>('00');
  const [count, setCount] = useState<number>(0);
  const [edit, setEdit] = useState<boolean>(false);
  const ref = useRef<HTMLInputElement>(null);

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
  }, [min, sec]);

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

  const handleChangeMin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMin(e.target.value);
  };

  const handleChangeSec = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSec(e.target.value);
  };

  const handleClickOnCounter = () => {
    setEdit(true);
    ref.current?.focus();
  };

  const handlePressKeyOnCounter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      setEdit(true);
      ref.current?.focus();
    }
  };

  return (
    <Card className="timer">
      <div className="timer__titles">
        <div className="timer__titles-minutes">minutes</div>
        <div className="timer__titles-seconds">seconds</div>
      </div>
      {edit ? (
        <div className="timer__edit">
          <input
            className="timer__edit-input"
            type="text"
            value={min}
            onChange={handleChangeMin}
            onFocus={() => setEdit(true)}
            onBlur={() => setEdit(false)}
            ref={ref}
            max={2}
          />
          <span className="timer__edit-dots">:</span>
          <input
            className="timer__edit-input"
            type="text"
            value={sec}
            onChange={handleChangeSec}
            onFocus={() => setEdit(true)}
            onBlur={() => setEdit(false)}
          />
        </div>
      ) : (
        <div
          className="timer__counter"
          role="button"
          tabIndex={0}
          onClick={handleClickOnCounter}
          onKeyPress={handlePressKeyOnCounter}
        >
          {start ? convertToFormat(count) : `${min}:${sec}`}
        </div>
      )}
    </Card>
  );
}
