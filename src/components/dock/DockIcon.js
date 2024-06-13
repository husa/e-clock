import './dockIcon.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobindr';

import lang from '../../services/lang';

class DockIcon extends Component {
  constructor(...args) {
    super(...args);
    autobind(this);
  }

  onClick(e) {
    if (this.props.isSettingsIcon) {
      this.props.toggleSettings();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      chrome.tabs.create({
        url: this.props.url,
        active: true,
      });
    } else {
      chrome.tabs.update({
        url: this.props.url,
      });
    }
  }

  render() {
    const className = classNames('dock-icon', `dock-icon--${this.props.className}`);

    return (
      <li className={className} data-alt={lang.t(this.props.text)} onClick={this.onClick}>
        <svg
          className='dock-icon__icon'
          viewBox={this.props.iconViewbox || '0 0 24 24'}
          width='24'
          height='24'>
          <use xlinkHref={`#${this.props.icon}`}></use>
        </svg>
      </li>
    );
  }
}

DockIcon.propTypes = {
  url: PropTypes.string,
  icon: PropTypes.string,
  text: PropTypes.string,
  iconViewbox: PropTypes.string,
  className: PropTypes.string,
  isSettingsIcon: PropTypes.bool,
  toggleSettings: PropTypes.func,
};

export default DockIcon;
