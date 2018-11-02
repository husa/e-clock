import React from 'react';

import {format24Hours, prependZero} from '../../utils/time';

const getTime = (use24, showSeconds) => {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  let time = [format24Hours(use24, hours), minutes];
  if (showSeconds) time = [...time, seconds];
  time = time.map(prependZero).join(':');
  if (use24) return time;
  if (hours < 12) return `${time}am`;
  return `${time}pm`;
};

class DocTitleUpdater extends React.Component {
  componentDidMount () {
    this.updateTitle();
    this.interval = setInterval(this.updateTitle.bind(this), 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  updateTitle () {
    document.title = getTime(this.props.use24, this.props.displaySeconds);
  }

  render () {
    return null;
  }
}

export default DocTitleUpdater;
