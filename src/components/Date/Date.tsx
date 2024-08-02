import './Date.scss';

import classNames from 'classnames';
import { useEffect, useState } from 'react';
import lang from '../../services/lang';
import { useSettingsSlice } from '../../store/slices/settingsSlice';

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
  const { state } = useSettingsSlice();

  const [{ day, month, date }, setDate] = useState(newDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(newDate());
    }, 60 * 1000);
    return () => clearInterval(interval);
  });

  if (!state.displayDate) return null;

  return (
    <div className={classNames(className, 'date')}>
      {lang.t(`Day${day}`)},&nbsp;
      {lang.t(`Month${month}`).slice(0, 3)}&nbsp;
      {date}
    </div>
  );
};

export default DateView;
