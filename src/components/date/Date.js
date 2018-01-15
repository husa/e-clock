import './date.styl';

import React from 'react';

import lang from '../../services/lang';

const newDate = () => {
  const date = new Date;
  return {
    day: date.getDay(),
    month: date.getMonth(),
    date: date.getDate()
  };
};

class DateView extends React.Component {
  constructor () {
    super();
    this.state = newDate();
  }

  componentDidMount () {
    this.interval = setInterval(this.updateDate.bind(this), 60 * 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  updateDate () {
    this.setState(newDate());
  }

  render () {
    if (!this.props.showDate) return null;
    const {fontFamily, fontSize} = this.props;
    const style = {
      fontFamily,
      fontSize: `${fontSize}rem`
    };

    const {day, month, date} = this.state;
    return (
      <div className="date__container" style={style}>
        <div className="date">
          {lang.t(`Day${day}`)},&nbsp;
          {lang.t(`Month${month}`).slice(0, 3)}&nbsp;
          {date}
        </div>
      </div>
    );
  }
}

export default DateView;
