import './clock.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

//import Slide from '../../common/animations/Slide';
import { prependZero, format24Hours } from '../../utils/time';

const newTime = () => {
  const date = new Date();
  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
    seconds: date.getSeconds(),
  };
};

type DigitsProps = {
  digits: string;
  className: string;
  animateDigits?: boolean;
};

const Digits = ({
  digits,
  className,
}: //animateDigits
DigitsProps) => {
  const digitsNodes = digits.split('').map((digit, i) => (
    <span className={`${className} ${className}-${i}`} key={`${i}-${digit}`}>
      {digit}
    </span>
  ));
  //if (animateDigits) {
  //  digits = <Slide>{digits}</Slide>;
  //}
  return <span className={`${className}s`}>{digitsNodes}</span>;
};

const Hours = ({ hours, use24, animateDigits }) => {
  hours = format24Hours(use24, hours);
  hours = prependZero(hours);
  return <Digits digits={hours} className='clock__hour' animateDigits={animateDigits} />;
};

const Minutes = ({ minutes, animateDigits }) => {
  minutes = prependZero(minutes);
  return <Digits digits={minutes} className='clock__minute' animateDigits={animateDigits} />;
};

const Seconds = ({ seconds, animateDigits }) => {
  seconds = prependZero(seconds);
  return <Digits digits={seconds} className='clock__second' animateDigits={animateDigits} />;
};

const Delimiter = ({ hidden = false, delimiterBlinking }) => {
  if (hidden) return null;
  const className = classNames('clock__delimiter', {
    'clock__delimiter--blinking': delimiterBlinking,
  });
  return <span className={className}>:</span>;
};

const AmPm = ({ hours }) => {
  const ampm = hours < 12 ? 'am' : 'pm';
  return <span className='clock__ampm'>{ampm}</span>;
};

const Clock = ({ className, use24, delimiterBlinking, displaySeconds, animateDigits }) => {
  const [{ minutes, hours, seconds }, setTime] = useState(newTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(newTime);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={classNames(className, 'clock')}>
      <div className='clock__time'>
        <Hours hours={hours} use24={use24} animateDigits={animateDigits} />
        <Delimiter delimiterBlinking={delimiterBlinking} />
        <Minutes minutes={minutes} animateDigits={animateDigits} />
        {displaySeconds && (
          <>
            <Delimiter delimiterBlinking={delimiterBlinking} />
            <Seconds seconds={seconds} animateDigits={animateDigits} />
          </>
        )}
        {!use24 && <AmPm hours={hours} />}
      </div>
    </div>
  );
};

export default Clock;
