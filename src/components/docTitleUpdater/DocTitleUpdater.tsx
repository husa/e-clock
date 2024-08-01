import { useEffect } from 'react';

import { format24Hours, prependZero } from '../../utils/time';
import { useSettingsSlice } from '../../store/slices/settingsSlice';

const getTime = (use24: boolean, showSeconds: boolean): string => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  let timeParts = [format24Hours(use24, hours), minutes];
  if (showSeconds) timeParts = [...timeParts, seconds];
  const time = timeParts.map(prependZero).join(':');
  if (use24) return time;
  if (hours < 12) return `${time}am`;
  return `${time}pm`;
};

export const DocTitleUpdater = () => {
  const { state: settings } = useSettingsSlice();
  const use24 = settings.use24format;
  const displaySeconds = settings.displaySeconds;

  useEffect(() => {
    const interval = setInterval(() => {
      document.title = getTime(use24, displaySeconds);
    }, 1000);

    return () => clearInterval(interval);
  }, [use24, displaySeconds]);

  return null;
};
