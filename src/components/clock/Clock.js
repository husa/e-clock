import './clock.styl';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Slide from '../../common/animations/Slide';
import { prependZero, format24Hours } from '../../utils/time';

class Clock extends Component {
  constructor(...args) {
    super(...args);
    this.state = this.getNewDate();
  }

  UNSAFE_componentWillMount() {
    this.interval = setInterval(this.updateTime.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  updateTime() {
    this.setState(this.getNewDate());
  }

  getNewDate() {
    const date = new Date();
    return {
      minutes: date.getMinutes(),
      hours: date.getHours(),
      seconds: date.getSeconds(),
    };
  }

  getHours() {
    let { hours } = this.state;
    hours = format24Hours(this.props.use24, hours);
    hours = prependZero(hours);
    return this.getDigits(hours, 'clock__hour');
  }

  getMinutes() {
    const minutes = prependZero(this.state.minutes);
    return this.getDigits(minutes, 'clock__minute');
  }

  getSeconds() {
    if (!this.props.displaySeconds) return null;
    const seconds = prependZero(this.state.seconds);
    return this.getDigits(seconds, 'clock__second');
  }

  getDelimiter(show = true) {
    if (!show) return null;
    const { delimiterBlinking } = this.props;
    const className = classNames('clock__delimiter', {
      'clock__delimiter--blinking': delimiterBlinking,
    });
    return <span className={className}>:</span>;
  }

  getDigits(digits, className) {
    digits = digits.split('').map((digit, i) => (
      <span className={`${className} ${className}-${i}`} key={`${i}-${digit}`}>
        {digit}
      </span>
    ));
    if (this.props.animateDigits) {
      digits = <Slide>{digits}</Slide>;
    }
    return <span className={`${className}s`}>{digits}</span>;
  }

  getAmPm() {
    let ampm = '';
    if (!this.props.use24) {
      ampm = this.state.hours < 12 ? 'am' : 'pm';
    }
    return <span className='clock__ampm'>{ampm}</span>;
  }

  render() {
    return (
      <div className='clock'>
        <div className='clock__time'>
          {this.getHours()}
          {this.getDelimiter()}
          {this.getMinutes()}
          {this.getDelimiter(this.props.displaySeconds)}
          {this.getSeconds()}
          {this.getAmPm()}
        </div>
      </div>
    );
  }
}

Clock.propTypes = {
  use24: PropTypes.bool,
  delimiterBlinking: PropTypes.bool,
};

export default Clock;
