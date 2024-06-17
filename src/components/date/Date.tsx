import './date.scss';

import React, { useEffect, useState } from 'react';

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
  showDate: boolean;
};

const DateView = ({ showDate }: Props) => {
  const [{ day, month, date }, setDate] = useState(newDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(newDate());
    }, 60 * 1000);
    return () => clearInterval(interval);
  });

  if (!showDate) return null;
  return (
    <div className='date'>
      {lang.t(`Day${day}`)},&nbsp;
      {lang.t(`Month${month}`).slice(0, 3)}&nbsp;
      {date}
    </div>
  );
};

export default DateView;
