import './clock.styl';

import React, {Component} from 'react';
import classNames from 'classnames';

import lang from '../../common/lang';

import Slide from '../../common/animations/Slide';

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
      seconds: date.getSeconds(),
      day: date.getDay(),
      month: date.getMonth(),
      date: date.getDate()
    };
  }

  getHours () {
    let {hours} = this.state;
    hours = this.props.use24 || !Math.floor(hours / 13) ? hours : hours - 12;
    hours = `${hours < 10 ? ' ' : '' }${hours}`;
    return this.getDigits(hours, 'clock__hour');
  }

  getMinutes () {
    let {minutes} = this.state;
    minutes = `${minutes < 10 ? 0 : '' }${minutes}`;
    return this.getDigits(minutes, 'clock__minute');
  }

  getSeconds () {
    if (!this.props.displaySeconds) return null;
    let {seconds} = this.state;
    seconds = `${seconds < 10 ? 0 : '' }${seconds}`;
    return this.getDigits(seconds, 'clock__second');
  }

  getDelimiter (show = true) {
    if (!show) return null;
    const {delimiterBlinking} = this.props;
    const className = classNames('clock__delimiter', {
      'clock__delimiter--blinking': delimiterBlinking
    });
    return (
      <span className={className}>:</span>
    );
  }

  getDigits (digits, className) {
    digits = digits.split('').map((digit, i) => (
      <span className={`${className} ${className}-${i}`} key={`${i}-${digit}`}>
        {digit}
      </span>
    ));
    if (this.props.animateDigits) {
      digits = (
        <Slide>
          {digits}
        </Slide>
      );
    }
    return (
      <span className={`${className}s`}>
        {digits}
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
        {this.getDelimiter(this.props.displaySeconds)}
        {this.getSeconds()}
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
