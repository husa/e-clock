import './date.scss';

import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import lang from '../../services/lang';

const newDate = () => {
  const date = new Date();
  return {
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate(),
  };
};

type Props = {
  className?: string;
};

const DateView = ({ className }: Props) => {
  const [{ day, month, date }, setDate] = useState(newDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(newDate());
    }, 60 * 1000);
    return () => clearInterval(interval);
  });

  return (
    <div className={classNames(className, 'date')}>
      {lang.t(`Day${day}`)},&nbsp;
      {lang.t(`Month${month}`).slice(0, 3)}&nbsp;
      {date}
    </div>
  );
};

export default DateView;