import './dockIcon.styl';

import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

import lang from '../../common/lang';

class DockIcon extends Component {

  onClick (e) {
    if (this.props.isSettingsIcon) {
      this.props.toggleSettings();
      return;
    }
    if (e.metaKey || e.ctrlKey || e.button === 1) {
      chrome.tabs.create({
        url: this.props.url,
        active: true
      });
    } else {
      chrome.tabs.update({
        url: this.props.url
      });
    }
  }

  render () {
    const className = classNames('dock-icon', `dock-icon--${this.props.className}`);

    return (
      <li
        className={className}
        data-alt={lang.t(this.props.text)}
        onClick={this.onClick.bind(this)}>
        <svg className="dock-icon__icon" viewBox="0 0 24 24" width="24" height="24">
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
  className: PropTypes.string,
  isSettingsIcon: PropTypes.bool,
  toggleSettings: PropTypes.func
};

export default DockIcon;
