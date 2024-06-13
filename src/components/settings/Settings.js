import './settings.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import autobind from 'autobindr';

import lang from '../../services/lang';

import Appearance from './AppearanceSettings';
import Dock from './DockSettings';
import Weather from './WeatherSettings';
import About from './AboutSettings';

const TABS = {
  Appearance,
  Dock,
  Weather,
  About,
};

class Settings extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      activeTab: Object.keys(TABS)[0],
    };
    autobind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onDocumentKeyDown);
  }

  componentWillUnmout() {
    document.removeEventListener('keydown', this.onDocumentKeyDown);
  }

  onDocumentKeyDown(e) {
    if (e.target.nodeName.toLowerCase() === 'input') return;
    if (e.keyCode === 27) this.onCloseClick();
  }

  onCloseClick() {
    this.props.closeSettings();
  }

  onTabClick(activeTab) {
    this.setState({ activeTab });
  }

  getTransferedProps() {
    return {
      settings: this.props.settings,
      setOptions: this.props.setOptions,
      dock: this.props.dock,
      setDockOptions: this.props.setDockOptions,
    };
  }

  getCloseIcon() {
    return (
      <div className='settings__close-icon' onClick={this.onCloseClick}>
        <svg height='24' viewBox='0 0 24 24' width='24'>
          <path d='M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' />
          <path d='M0 0h24v24H0z' fill='none' />
        </svg>
      </div>
    );
  }

  getTabs() {
    return Object.keys(TABS).map(tab => {
      const className = classNames('settings__tab', {
        'settings__tab--active': this.state.activeTab === tab,
      });

      return (
        <div key={tab} className={className} onClick={this.onTabClick.bind(this, tab)}>
          {lang.t(tab)}
        </div>
      );
    });
  }

  getTabContent() {
    if (!this.props.isOpen) return null;
    const tab = this.state.activeTab;
    let Content = TABS[tab];
    return <Content {...this.getTransferedProps()} />;
  }

  render() {
    const className = classNames('settings', {
      'settings--open': this.props.isOpen,
    });

    return (
      <div className={className}>
        <div className='settings__header'>
          {this.getTabs()}
          {this.getCloseIcon()}
        </div>
        <div className='settings__content'>{this.getTabContent()}</div>
      </div>
    );
  }
}

Settings.propTypes = {
  isOpen: PropTypes.bool,
  settings: PropTypes.object,
  dock: PropTypes.object,
  closeSettings: PropTypes.func,
  setOptions: PropTypes.func,
  setDockOptions: PropTypes.func,
};

export default Settings;
