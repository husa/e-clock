import './clock.styl';

import React, {Component} from 'react';
import classNames from 'classnames';

import lang from '../../common/lang';

class Clock extends Component {

  constructor (...args) {
    super(...args);
    this.state = this.getNewDate();
  }

  componentWillMount () {
    this.interval = setInterval(this.updateTime.bind(this), 1000);
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  updateTime () {
    this.setState(this.getNewDate());
  }

  getNewDate () {
    const date = new Date;
    return {
      minutes: date.getMinutes(),
      hours: date.getHours(),
      day: date.getDay(),
      month: date.getMonth(),
      date: date.getDate()
    };
  }

  getHours () {
    let hours = this.state.hours;
    return (
      <span className="clock__hours">
        {this.props.use24 || !Math.floor(hours / 13) ? hours : hours - 12}
      </span>
    );
  }

  getDelimiter () {
    const {delimiterBlinking} = this.props;
    const className = classNames('clock__delimiter', {
      'clock__delimiter--blinking': delimiterBlinking
    });
    return (
      <span className={className}>:</span>
    );
  }

  getMinutes () {
    let minutes = this.state.minutes;
    minutes = `${minutes < 10 ? 0 : '' }${minutes}`;
    return (
      <span className="clock__minutes">
        {minutes}
      </span>
    );
  }

  getAmPm () {
    let ampm = '';
    if (!this.props.use24) {
      ampm = this.state.hours < 12 ? 'am' : 'pm';
    }
    return (
      <span className="clock__ampm">
        {ampm}
      </span>
    );
  }

  getTime () {
    return (
      <div className="clock__time">
        {this.getHours()}
        {this.getDelimiter()}
        {this.getMinutes()}
        {this.getAmPm()}
      </div>
    );
  }

  getDate () {
    if (!this.props.showDate) return null;
    let {day, month, date} = this.state;
    return (
      <div className="clock__date">
        {lang.t(`Day${day}`)},&nbsp;
        {lang.t(`Month${month}`).slice(0, 3)}&nbsp;
        {date}
      </div>
    );
  }

  render () {
    const {fontFamily, fontSize} = this.props;
    const style = {
      fontFamily,
      fontSize: `${fontSize}em`
    };

    return (
      <div className="clock" style={style}>
        {this.getTime()}
        {this.getDate()}
      </div>
    );
  }
}

Clock.propTypes = {
  use24: React.PropTypes.bool,
  fontFamily: React.PropTypes.string,
  fontSize: React.PropTypes.string,
  showDate: React.PropTypes.bool,
  delimiterBlinking: React.PropTypes.bool
};

export default Clock;
