import './clock.sass';

import React, { Component, useEffect, useState } from 'react';
import classNames from 'classnames';

import Slide from '../../common/animations/Slide';
import { prependZero, format24Hours } from '../../utils/time';

const newTime = () => {
  const date = new Date();
  return {
    minutes: date.getMinutes(),
    hours: date.getHours(),
    seconds: date.getSeconds(),
  };
};

const Digits = ({ digits, className, animateDigits }) => {
  digits = digits.split('').map((digit, i) => (
    <span className={`${className} ${className}-${i}`} key={`${i}-${digit}`}>
      {digit}
    </span>
  ));
  //if (animateDigits) {
  //  digits = <Slide>{digits}</Slide>;
  //}
  return <span className={`${className}s`}>{digits}</span>;
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

const Seconds = ({ seconds, hidden, animateDigits }) => {
  if (hidden) return null;
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

const AmPm = ({ use24 }) => {
  let ampm = '';
  if (!use24) {
    ampm = this.state.hours < 12 ? 'am' : 'pm';
  }
  return <span className='clock__ampm'>{ampm}</span>;
};

const Clock = ({ use24, delimiterBlinking, displaySeconds, animateDigits }) => {
  const [{ minutes, hours, seconds }, setTime] = useState(newTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(newTime);
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className='clock'>
      <div className='clock__time'>
        <Hours hours={hours} use24={use24} animateDigits={animateDigits} />
        <Delimiter delimiterBlinking={delimiterBlinking} />
        <Minutes minutes={minutes} animateDigits={animateDigits} />
        <Delimiter delimiterBlinking={delimiterBlinking} />
        <Seconds seconds={seconds} hidden={!displaySeconds} animateDigits={animateDigits} />
        <AmPm use24={use24} />
      </div>
    </div>
  );
};

export default Clock;
