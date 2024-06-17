import React, { useEffect } from 'react';

import { format24Hours, prependZero } from '../../utils/time';

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

type Props = {
  use24: boolean;
  displaySeconds: boolean;
};

const DocTitleUpdater = ({ use24, displaySeconds }: Props) => {
  useEffect(() => {
    const interval = setInterval(() => {
      document.title = getTime(use24, displaySeconds);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [use24, displaySeconds]);

  return null;
};

export default DocTitleUpdater;
