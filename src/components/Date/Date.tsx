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

const UPDATE_INTERVAL = 60 * 1000;

const DateView = ({ className }: Props) => {
  const { state } = useSettingsSlice();

  const [{ day, month, date }, setDate] = useState(newDate());
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(newDate());
    }, UPDATE_INTERVAL);
    return () => clearInterval(interval);
  });

  if (!state.displayDate) return null;

  return (
    <div className={classNames(className, 'date')}>
      {lang.t(`i18nDay${day}` as 'i18nDay0')},&nbsp;
      {lang.t(`i18nMonth${month}` as 'i18nMonth0').slice(0, 3)}&nbsp;
      {date}
    </div>
  );
};

export default DateView;
